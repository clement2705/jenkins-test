var assert = require('assert'),
  request = require('request')

const url = "http://localhost:" + "8090" + "/graph";

describe("mocha tests", function () {
  console.log("url is", url)

  it("test", function (done) {
    //expect(response.statusCode).toBe(200);
    assert.equal(0, 0);
    done();
  });

  it("test webhook", function (done) {
    //expect(response.statusCode).toBe(200);
    assert.equal(0, 0);
    done();
  });

  it("in test jenkins branch", function (done) {
    //expect(response.statusCode).toBe(200);
    assert.equal(0, 0);
    done();
  });
  
});