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
  var day_offset = req.query.dayOffset;
  persistence.getMeasurementsByPollutorId(pollutor_id, day_offset , res);
});

 
app.get('/addPollutor', function (req, res) {
 });

app.get('/bounceData', function (req, res) {
  
  //if (req.query.gps_valid == "false") return;
  
  console.log('Saving data:',req.query);
  res.json({result: true});
  
  return; 
  var battery = new model.Measurement();
  battery.pos_lat = req.query.lat;
  battery.pos_long = req.query.long;
  battery.device_id = req.query.device_id;
  battery.pollutor = 'CH4';
  battery.value = req.query.MQ4;
  
  persistence.addMeasurement(battery, res);
  
  //var measurement = new model.Measurement();
  //measurement.pos_lat = req.query.lat;
  //measurement.pos_long = req.query.long;
  //measurement.device_id = req.query.device_id;
  //measurement.pollutor = 'CH4';
 
  
  //var ch4Calc = new model.PartsCalculator('MQ4');
  //measurement.value = ch4Calc.getPartsPerMillion(req.query.MQ4, req.query.temperature, req.query.humidity, 'CH4');
  
  //console.log('GOT DATA:', measurement);
  //persistence.addMeasurement(req.query, res);
  
  
  
});

app.get('/addData', function (req, res) {
 
  console.log(req.query);
  res.json({result: req.query});
});

