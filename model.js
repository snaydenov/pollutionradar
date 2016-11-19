exports.Measurement = function (value) {
  this.value = value;
  this.pos_lat = "";
  this.pos_long = "";
  this.device_id = "";
  this.pollutor = "";
};

exports.Interpolator = function(positions, values, humidityError) {
  this.positions = positions;
  this.values = values;
  
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

exports.PartsCalculator = function(sensor) {
  this.sensor = sensor;
  this.interpolator = new exports.Interpolator(exports.intCoef[sensor].positions, exports.intCoef[sensor].values, exports.intCoef[sensor].humidityError);
  var convertToPPM = function(ratio, gas) {
    var gasCoeficients =  exports.intCoef[sensor].partsCoeficients[gas];  
    
    return (Math.pow(10,( ((Math.log(ratio)-gasCoeficients[1])/gasCoeficients[2]) + gasCoeficients[0])));
  }
  
  this.getPartsPerMillion = function(ratio, temperature, humidity, gas) {  
    var error = this.interpolator.interpolate(temperature, humidity);
   
    ratio = ratio / error;
    
    return convertToPPM(ratio, gas);
  }
}

exports.intCoef = {
  MQ135: {
    positions: [-10,0,5,10,20,50],
    values: [1.7,1.38,1.25,1.14,1,0.91],
    humidityError: 0.1
  },
  MQ4: {
    positions: [-10,0,5,10,20,50],
    values: [1.28,1.15,1.095,1.05,1,0.9],
    humidityError: 0.15,
    partsCoeficients: {
      CH4: [2.,1,-0.55] //position x, position y, slope
    }
  }
}
