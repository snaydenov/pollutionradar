function myMap() {
  $.get( "pollutiondata",{pollutorId :1}, function( data ) {
    renderMap(data);
  });
  
  $.get( "addData",{lat:123,long:123,device_id:1,temperature:13,humidity:41,MQ4:123}, function( data ) {
    renderMap(data);
  });
  
  $.get( "pollutors", function( data ) {
    console.log(data);
    var options = $("#selGases");
    $.each(data, function() {
        options.append($("<option />").val(this.pollutor_id).text(this.name));
    });
    
    options.change(function() {
      $.get( "pollutiondata",{pollutorId :$(this).val()}, function( data ) {
        renderMap(data);
      });
    });
  });
  
  
}

function renderMap(data) {
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(42.696, 23.32601),
    zoom: 12
  }
  var map = new google.maps.Map(mapCanvas, mapOptions);
  addGrid(map, data);
  
}

function addGrid(map, data) {

  for (var i =0;i<50;i++)
    for (var k =0;k<50;k++) {
      var north = 42.58 + ((i+1)*0.0050);
      var  south = 42.58 + (i*0.0050);
      var  east = 23.18 + ((k+1)*0.0070);
      var  west = 23.18 + (k*0.0070);
      var color = '#CCCCCC';
      for (var pollution in data ) {
        if(data[pollution].position_lat <= north && data[pollution].position_lat > south
          && data[pollution].position_long <= east && data[pollution].position_long > west) {
          if(data[pollution].value > 50) {
            color = '#FFFF00';
          }
          else if(data[pollution].value > 20) {
            color = '#FF0000';
          }
          else {
            color = '#00FF00';
          }
        }
      }
      
      drawRectangle(map,east,west,north,south,color);
      
      if(color != '#CCCCCC') {
      for(var l = -1; l<=1; l++)
        for(var t = -1; t<=1; t++){
          drawRectangle(map,east + l*0.0070 ,west + l*0.0070,north + t*0.0050,south + t*0.0050,color);
        }
      }
  };  
}


function drawRectangle(map, x1,x2,y1,y2, color){
  return new google.maps.Rectangle({
    strokeColor: color,
    strokeOpacity: 0.4,
    strokeWeight: 0.35,
    fillColor: color,
    fillOpacity: 0.2,
    map: map,
    bounds: {
      north: y1,
      south: y2,
      east: x1,
      west: x2
    }
  });
}