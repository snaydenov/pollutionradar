exports.Measurement = function (value) {
  this.value = value;
  this.pos_lat = "";
  this.pos_long = "";
  this.device_id = "";
  this.pollutor = "";
};

exports.Interpolation = function(positions, values, humidityError) {
  this.positions = positions;
  this.values = values;
  this.humidity = humidity;
  
  this.interpolate = function(value, humidity) {
    var pos = 0;
    
    for(var i = 0;i < positions.length; i++) {
      if(value < positions[i+1]) {
        pos = i;
        break;
      }
    }
    
    result = values[pos] + ((values[pos+1] - values[pos])/
      (positions[pos + 1] - positions[pos])) * (value - positions[pos]);
      
    return result -  humidityError *((humidity-33)/52);
  }
}

exports.intCoef = {
  MQ135: {
    positions: [-10,0,5,10,20,50],
    values: [1.7,1.38,1.25,1.14,1,0.91],
    humidityError: 0.1
  }
}
