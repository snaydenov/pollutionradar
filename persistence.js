var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'stoyan',
  password : 'crocodile',
  database : 'pollutionradar',
  multipleStatements: true
});

connection.connect();

//Users

exports.getUser = function(username, socket){
  //TO DO
};

exports.insertUser = function(username, password){
  //TO DO
};

exports.userExists = function(email){
  //TO DO
};

exports.getPollutors = function(result){
  connection.query('CALL get_pollutors();', function(err, rows, fields) {
    if (err) throw err;    
    console.log(rows[0]);
    result.json(rows[0]);
  });
};

exports.addMeasurement = function(measurement, result){
  //TO DO   
  
  console.log('Executing add', measurement);
  
  connection.query("SET @a1 ='" + measurement.device_id + "';");
  connection.query("SET @a2 ='" + measurement.pollutor + "';");
  connection.query("SET @a3 ='" + measurement.pos_lat + "';");
  connection.query("SET @a4 ='" + measurement.pos_long + "';");
  connection.query("SET @a5 ='" + measurement.value + "';");
  
  connection.query('CALL measurements_add(@a1, @a2, @a3, @a4, @a5);', function(err, rows, fields) {
    if (err) throw err;  
    console.log('added_measurements');
  });
  
};

exports.getMeasurementsByPollutorId = function(pollutor_id, dateOffset, result){
  connection.query("SET @a1 ='" + pollutor_id + "';");
  connection.query("SET @a2 ='" + dateOffset + "';");
  connection.query('CALL measurements_select_by_pollutor_id(@a1, @a2);', function(err, rows, fields) {
    if (err) throw err;  
    console.log('got_measurements', rows[0]);
    result.json(rows[0]);
  });
};
