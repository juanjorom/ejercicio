var express = require('express');
const createError = require('http-errors');
var router = express.Router();
const https = require('https');
const {insert, getCollection} = require('../database/database');


router.put('/alpha', function(req, res, next) {
  if (Object.keys(req.body).length > 0){
    next();
  }
  else next(createError(400))
}, function(req, res){
  let info = req.body;
  let sortedKeys = Object.keys(info).sort();
  let responseBody = {};

  sortedKeys.forEach(function(value){
    responseBody[value] = info[value];
  });
  insert('primary_data', responseBody).then(() => {
    res.json(responseBody);
  })
});



router.post('/flatten', function(req, res, next){
  if (Object.keys(req.body).length > 0){
    next();
  }
  else next(createError(400))
}, function(req, res){
  let info = req.body;
  Object.keys(info).forEach(function(value, index){
    if (typeof info[value] === 'object'){
      try{
        info[value] = info[value].join()
      }
      catch{
        console.log(`[${value}] value is not an array, object found!`);
      }
    }
  })
  res.json(info);
});


router.post('/quote', function(req, res, next){
  const requesting = https.get('https://programming-quotes-api.herokuapp.com/quotes/random', (response) => {
    response.on('data', (d) => {
      let document = JSON.parse(d.toString());
      let fecha = new Date();
      document = {
        id: document.id,
        quote: document.en,
        author: document.author,
        consultation_date: `${("0" + fecha.getDate()).slice(-2)}-${("0" + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`
      }
      let responseBody = {};
      Object.assign(responseBody,document);
      insert('quotes',document).then(() => res.json(responseBody) )
    })
  });
  
  
  requesting.on('error', (e) => {
    console.error(e);
    next(createError(500))
  });
})

router.get('/quotes', function(req, res, next){
  getCollection('quotes').then((data)=> {
    let newData = []
    data.forEach((value) => {
      newData.push({
        id: value.id,
        quote: value.quote,
        author: value.author,
        consultation_date: value.consultation_date
      })
    })
    let authors = newData.map((value) => value.author);
    let oneAuthors = new Set(authors)
    let result = {};
    oneAuthors.forEach((value) => {
      result[value] = newData.filter((compare) => compare.author === value)
    })
    res.json(result)
  })
})

module.exports = router;
