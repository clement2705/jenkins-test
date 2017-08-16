import chokidar from 'chokidar';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import graphiqlExpress from 'graphql-server-express';
import path from 'path';
import { clean } from 'require-clean';
import { exec } from 'child_process';
import jsonwebtoken from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';

import config from './config/config-loader';

import mongoose from 'mongoose';

// This must be imported for use in userHandlers
import User from './src/db-models/user-model';

import { Schema } from './src/schema';


var exports = module.exports = {};


if (config && config.dev_defaults && config.dev_defaults.echo_config) {
  console.log('config', config);
}

const GRAPHQL_PORT = parseInt(config.http_port);

let graphQLServer;

mongoose.Promise = global.Promise;

function startGraphQLServer(callback) {

  let promiseDb = mongoose.connect(
    'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' +
    config.mongodb.database_name,
    { useMongoClient: true, }, );

  promiseDb.then((db) => {
    console.log('Mongoose connected ok ');
  }).catch(err => {
    console.error('Mongoose connection error:', err.stack);
    process.exit(1);
  });

  // Note - this can't be moved into "imports" at the moment
  var userHandlers = require('./api/controllers/user-controller.js');

  // Expose a GraphQL endpoint
  
  clean('./src/schema');

  const graphQLApp = express();

  graphQLApp.use(cors({
    origin: config.cors_origin, credentials: true
  }))

  graphQLApp.use(bodyParser.urlencoded({ extended: true }));
  graphQLApp.use(bodyParser.json());

  graphQLApp.use(userHandlers.getViewer);

  graphQLApp.use('/graph', userHandlers.loginRequired, graphQLHTTP((request, response, graphQLParams) => ({
    graphiql: true,
    pretty: true,
    schema: Schema,
    context: request.gqlviewer,
  })));

  var routes = require('./api/routes/rest-routes');
  routes(graphQLApp);

  graphQLServer = graphQLApp.listen(GRAPHQL_PORT, () => {
    console.log(
      `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`
    );
    if (callback) {
      callback();
    }
  });
}

function startServers(callback) {
  // Shut down the servers
  if (graphQLServer) {
    graphQLServer.close();
  }

  // Compile the schema
  exec('npm run update-schema', (error, stdout) => {
    console.log(stdout);
    let doneTasks = 0;
    function handleTaskDone() {
      doneTasks++;
      if (doneTasks === 1 && callback) {
        callback();
      }
    }
    startGraphQLServer(handleTaskDone);
  });
}

exports.closeServer = function(){
  server.close();
};

const watcher = chokidar.watch('./src/{database,schema}.js');
watcher.on('change', path => {
  console.log(`\`${path}\` changed. Restarting.`);
  startServers(() =>
    console.log('Restart your browser to use the updated schema.')
  );
});

startServers();
