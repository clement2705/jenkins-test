import assert from 'assert'
import request from 'request'

const url = "http://localhost:" + "8090" + "/graph";

describe("mocha tests", function () {

  console.log("url is",url)

  it("return true", function (done) {
    //expect(response.statusCode).toBe(200);
    assert.equal(0, 0);
    done();
  });

  // it("no error message", function(done) {
  //   request.get(url, function(error, response, body) {
  //     assert.equal(null, response.error);
  //     done();
  //   });
  // });

  // it("must provide query string!", function(done) {
  //   request.get(url, function(error, response, body) {
  //     assert.equal('{\n  "errors": [\n    {\n      "message": "Must provide query string."\n    }\n  ]\n}', response.body);
  //     done();
  //   });
  // });

});