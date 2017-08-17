# gql-server-core

1) `npm install`

2) if src/schema.json does not exist - copy src/schema_sample.json into src/schema.json
Note: this should be resolved by switching from the deprecated babel-relay-plugin to babel-plugin-relay (TODO)

3) Open mongodb (`mongod`) in another terminal window 
kill previous mongo iteration if already open with `ps -ax | grep mongo`
Then `kill -9 <the number displayed by terminal on the left of mongoDB>`)

4) Kill previous database with same name (some fields have to be unique, so seeding won’t work if we don’t kill it)

5) Run the seed function: `babel-node src/seed/Seed.js`

6) Run the program `npm start`

7) Copy paste link in `src/relay-queries/index.js` to browser

GraphiQL: http://localhost:8080/

Relay Endpoint: http://localhost:8080/
