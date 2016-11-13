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

exports.addMeasurements = function(pollutionData, result){
  //TO DO
  });
};

exports.getMeasurementsByPollutorId = function(pollutor_id, result){
  connection.query("SET @a1 ='" + pollutor_id + "';");
  connection.query('CALL measurements_select_by_pollutor_id(@a1);', function(err, rows, fields) {
    if (err) throw err;  
    console.log('got_measurements', rows[0]);
    result.json(rows[0]);
  });
};
