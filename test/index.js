const request = require('supertest');
const app = require('../app');


describe('GET /', function() {
    it('respond with 404', function(done){
        request(app)
        .get('/')
        .expect(404, done)
    })
})


describe('PUT /alpha', function() {
    it('responds with json', function(done) {
      request(app)
        .put('/alpha')
        .set('Content-Type', 'application/json')
        .send({
            fruit: "apple",
            animal: "zebra",
            "city-list": [
            "sunnyvale",
            "sanjose"
            ]
        })
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });


describe('PUT /alpha', function() {
    it('responds with 400', function(done) {
        request(app)
        .put('/alpha')
        .set('Accept', 'application/json')
        .expect(400, done);
    });
});

describe('POST /flatten', function(){
    it('responds with json', function(done){
        request(app)
        .post('/flatten')
        .send({
            "fruit": "apple",
            "animal": "zebra",
            "city-list": [
                "sunnyvale",
                "sanjose"
            ]
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done)
    })
});

describe('POST /flatten', function(){
    it('responds with json', function(done){
        request(app)
        .post('/flatten')
        .send({
            "fruit": "apple",
            "animal": "zebra",
            "city-list": [
                "sunnyvale",
                "sanjose"
            ],
            "lada-codes": {
                "mxn": "+52",
                "usa": "+1"
            }
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done)
    })
});

describe('POST /flatten', function(){
    it('responds with 400', function(done){
        request(app)
        .post('/flatten')
        .expect(400, done)
    })
})

describe('GET /quote', function(){
    it('responds with a json', function(done){
        request(app)
        .post('/quote')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done)
    })
})

describe('GET /quotes', function(){
    it('responds with a json', function(done){
        request(app)
        .get('/quotes')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done)
    })
})
