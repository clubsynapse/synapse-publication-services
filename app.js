var express = require('express');
//var path = require('path');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./database');

var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var router = express.Router();

//Managing /publications requests
router.route('/')

//The post request must have id, titre, auteur, contenu, themes, files, and forms attributes
.post(function(req, res){
  database
})

.get(function(req, res){
  console.log(req);
  database.getAllPublications(function(pubs){
    console.log(req+" : OK");
    res.json(pubs);
  });
})



app.use('/publications', router);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send(err);
});

module.exports = app;