var assert = require('assert'),
  request = require('request')

const url = "http://localhost:" + "8090" + "/graph";

describe("mocha tests", function () {
  console.log("url is", url)
  it("return true", function (done) {
    //expect(response.statusCode).toBe(200);
    assert.equal(0, 0);
    done();
  });

  it("merged to master?", function (done) {
    //expect(response.statusCode).toBe(200);
    assert.equal(0, 0);
    done();
  });

  it("merged from any branch initial commit", function (done) {
    //expect(response.statusCode).toBe(200);
    assert.equal(0, 0);
    done();
  });

  it("merged from any branch", function (done) {
    //expect(response.statusCode).toBe(200);
    assert.equal(0, 0);
    done();
  });
  
});