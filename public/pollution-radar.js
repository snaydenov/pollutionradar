var colors = {
  red : '#FF0000',
  yellow : '#FFFF00',
  green : '#00FF00',
  grey: '#CCCCCC'
} 
function myMap() {
  $.get( "pollutiondata",{pollutorId :1,dayOffset:0}, function( data ) {
    renderMap(data);
  });
  
  $.get( "pollutors", function( data ) {
    console.log(data);
    var options = $("#selGases");
    $.each(data, function() {
        options.append($("<option />").val(this.pollutor_id).text(this.name));
    });
    
    options.change(function() {
      $.get( "pollutiondata",{pollutorId :$(this).val(), dayOffset: 7 - $("#selValue").val()}, function( data ) {
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
  centerOnLocation(map);
  map.setMapTypeId('hybrid');
  addGrid(map, data);
  
}

function prepareData(data) {
  var result = [];
  for(var i = 0; i < 50; i++) {
    for (var k =0;k<50;k++) {
    }
  }
}

function addGrid(map, data) {
  var startX = 42.62;
  var startY = 23.22;
  var rectHeight = 0.0040;
  var rectWidth = 0.0056;
  for (var i =0;i<40;i++)
    for (var k =0;k<43;k++) {
      var north = startX + ((i+1)*rectHeight);
      var  south = startX + (i*rectHeight);
      var  east = startY + ((k+1)*rectWidth);
      var  west = startY + (k*rectWidth);
      var color = colors.grey;
      for (var pollution in data ) {
        if(data[pollution].position_lat <= north && data[pollution].position_lat > south
          && data[pollution].position_long <= east && data[pollution].position_long > west) {
          if(data[pollution].value > 50) {
            color = colors.red;
          }
          else if(data[pollution].value > 20) {
            color = colors.yellow;
          }
          else {
            color = colors.green;
          }
        }
      }
      
      drawRectangle(map,east,west,north,south,color);
      
      if(color != colors.grey) {
      for(var l = -1; l<=1; l++)
        for(var t = -1; t<=1; t++){
          drawRectangle(map,east + l*rectWidth ,west + l*rectWidth,north + t*rectHeight,south + t*rectHeight,color);
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

function centerOnLocation(map) {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var infoWindow = new google.maps.Marker({map: map});
      infoWindow.setPosition(pos);
      console.log("setting to current location");
      map.setCenter(pos);
    }, function() {
      console.log("error getting location");
    });  
  }
}