process.env.NODE_ENV = 'test';

var request = require('request'),
    expect = require('chai').expect,
    baseUrl = 'http://localhost:3000';

describe('GET /', function() {
  it('should return statusCode 200', function (done) {
    request(baseUrl, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('GET /api/todos', function() {
  it('should return statusCode 200', function (done) {
    request(baseUrl + '/api/todos', function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('POST /api/todos', function() {
  it('should return statusCode 200', function (done) {
    request.post(
      {
        url: baseUrl + '/api/todos',
        form: {
          task: 'Walk Dog',
          description: 'Take Fluffy for a walk'
        }
      },
      function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });
});

describe('PUT /api/todos/:id', function() {
  it('should return statusCode 200', function (done) {
    request.put(
      {
        url: baseUrl + '/api/todos/1',
        form: {
          task: 'Walk Dog',
          description: 'Take Spot for a walk'
        }
      },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });
});

describe('DELETE /api/todos/:id', function() {
  it('should return statusCode 200', function (done) {
    request.del(baseUrl + '/api/todos/1', function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});