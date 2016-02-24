/* ================================
Week 6 Assignment: Midterm Function Signatures
================================ */
/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var dataset = 'https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/geojson/philadelphia-garbage-collection-boundaries.geojson';


var resetMap = function(parsed) {
  _.each(parsed, function(val){
    map.removeLayer(val);
  });
};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax).
===================== */
var data = [];
var getAndParseData = function() {
   $.ajax(dataset).done(function(val){
     var parsed= JSON.parse(val);
     var mark= _.map(parsed,function(val){
       data.push(val);
     });

   });

};

/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */
var plotData = function() {
  var makeMarkers=function(parsed){

    var filtered=_.filter(parsed,function(val){
      return((numericField1)||stringField||booleanField);
    });


    var mark=_.map(filtered, function(val){
      return L.marker([val.X, val.Y]);
    });

    return mark;

  };
  var plotMarkers=function(mark){
    _.each(mark,function(val){
      val.addTo(map);
    });
  };
  var markers=makeMarkers(data);
  plotMarkers(markers);

};


//classify by zip code
var myStyle = function(feature) {
  if (19100<=feature.properties.ZIP<=19110){
    return{color:'red'};
  }
  if (19111<=feature.properties.ZIP<=19120){
    return{color:'green'};
  }
  if (19121<=feature.properties.ZIP<=19130){
    return{color:'blue'};
  }
  if (19131<=feature.properties.ZIP<=19140){
    return{color:'yellow'};
  }
  if (feature.properties.ZIP>=19141){
    return{color:'#5d4c52'};

  }

};


var eachFeature = function(feature, layer) {

  layer.on('click', function (e) {
    map.fitBounds(this.getBounds());
    console.log(feature);
    showResults();
  });
};



var myFilter = function(feature) {
  if (feature.properties.ZIP ===" "){
    return true;
  }

};

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    var myFeatureGroup = L.geoJson(parsedData, {
      onEachFeature: eachFeature,
      style: myStyle,
      filter: myFilter
    }).addTo(map);
  });

});

var showResults = function() {
  $('#intro').hide();
  $('#results').show();
};


var closeResults=function(){
  $('#results').hide();
  $('#intro').show();
  map.setView([40.000, -75.1090],11);
};

$('#next').click(function(){
    closeResults();
});
