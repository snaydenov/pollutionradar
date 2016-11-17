var http = require('http');
var url = require("url");
var express = require('express');
var _ = require('underscore');
var app = express();

var persistence = require('./persistence.js');
var model = require('./model.js');
app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use(express.methodOverride());
app.use(express.bodyParser());  
app.use(app.router);
app.use('/public', express.static('public'));

var server = http.createServer(app);

server.listen(8080);
console.log('server started');

app.get('/index.html', function (req, res) {
  res.render('index');
  console.log('got index');
});

app.get('/pollutors', function(req,res) {
  persistence.getPollutors(res);
});

app.get('/pollutiondata', function (req, res) {
  
  var pollutor_id = req.query.pollutorId;
  persistence.getMeasurementsByPollutorId(pollutor_id, res);
});

app.get('/addData', function (req, res) {
  
  persistence.addMeasurement(req.query, res);
  
  res.json({result: true});
  
});

app.get('/bounceData', function (req, res) {
 
  console.log(req.query);
  res.json({result: req.query});
});

