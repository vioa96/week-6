/* ================================
Week 6 Assignment: Slide Model
================================ */
var dataset = 'https://raw.githubusercontent.com/vioa96/datasets/master/geojson/HousingCounselingAgencies.geojson';
//housing counseling data in Philadelphia

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
  if (feature.properties.OTHER ===" "){
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

$('#close').click(function(){
    closeResults();
});


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
