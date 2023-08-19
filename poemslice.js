
// the variable lines is a big fat string loaded from batch1.js
// TO DO: replace lines with something loaded from a database
// MongoDB Atlas maybe?



function poemLoad(){
  //random number between 0 and 30 less than the length of the poem section
//TO DO: move this server-side... upon API request, make a random selection from the data and deliver that. Don't deliver the whole damn thing. 
// TO DO: Make another request when the edited poem is submitted 

var rando = Math.floor(Math.random() * (lines.length - 30));

var poemSection = ` `
for (i=0; i<31; i++) {

poemSection += lines[(rando+i)]+"\r\n";

}
  var poemChunkTarget = document.getElementById("poem");
  poemChunkTarget.value =  poemSection; //change this to some kind of array later... why?
}


window.onload = (event) => {
  //console.log('page is fully loaded');
  poemLoad();
};
/* 

change cursor to crosshair when a spot is clicked? or some other thing?
document.body.style.cursor = "crosshair";
*/


//from https://forum.openstreetmap.org/viewtopic.php?id=57038 
function onMapClick(e) {

    var lat  = e.latlng.lat.toFixed(5);
    var lon  = e.latlng.lng.toFixed(5);
    var gps = "";
    
    //if (lat>0) gps+='N'; else gps+='S';
    //if (10>Math.abs(lat))  gps += "0";
    gps += lat+", ";
    //if (lon>0) gps+='E'; else gps+='W';
    //if (10>Math.abs(lon))  gps += "0";
    //if (100>Math.abs(lon)) gps += "0";
    gps += lon;

//pushes clicked on location lat and long to Location form input

    var locInForm = document.getElementById("location");
    locInForm.defaultValue = gps;

// creates ID out of a timestamp

    var dater = new Date();
    var stamp = dater.getTime();

    var idStamp = document.getElementById("idTime");
    idStamp.defaultValue = stamp; //something that means seconds;

// What the fuck was this part for?

    /*
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = gps;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'Successfully' : 'Unsuccessfully';
      console.log(msg + ' copied ' + gps + ' to clipboard ');
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
    */
}

// MAKE MAP
// to-do... change the tile layers so that it's cooler	
var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osm = new L.TileLayer(osmUrl, {minZoom:2, maxZoom:19});		

var googleStreets = new L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{minZoom:1, maxZoom:19, subdomains:['mt0','mt1','mt2','mt3']});

var googleSat = new L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{minZoom:1, maxZoom: 21,subdomains:['mt0','mt1','mt2','mt3']});

var map = new L.Map('mapDiv', { doubleClickZoom:false, zoomControl:false, maxBounds:([[90,-270],[-90,270]]) });

L.control.layers({"OSM (Mapnik)": osm, "Google Street": googleStreets, "Google Earth": googleSat}).addTo(map);

map.addLayer(osm);
var map_set = "osm";
map.fitBounds([[0,-180],[0,180]]);
map.setView([40.73759, -73.96436], 13);

map.on('click', onMapClick);

/*
(function() {
  function toJSONString( form ) {
    var obj = {};
    var elements = form.querySelectorAll( "input, select, textarea" );
    for( var i = 0; i < elements.length; ++i ) {
      var element = elements[i];
      var name = element.name;
      var value = element.value;

      if( name ) {
        obj[ name ] = value;
      }
    }

    return JSON.stringify( obj );
  }
  */

 const scriptURL = 'https://script.google.com/macros/s/AKfycbyO4xnG3cnAk2OqiInasXNpyCadSWEJR7XwQg8gn4Gh7OSCM4M/exec'
 const form = document.forms['test']

 form.addEventListener('submit', e => {
  poemChunkTarget.value = "`" + poemChunkTarget.value + "`";
  console.log('this part works at least');
   e.preventDefault()
   fetch(scriptURL, { method: 'POST', body: new FormData(form)})
     .then(response => {console.log('Success!', response);
     document.getElementById("response-msg").innerHTML = "Submitted! Reload page to do another one!";
     //poemLoad();
    })
     .catch(error => {console.error('Error!', error.message);
     document.getElementById("response-msg").innerHTML = "Oh no, it didn't go through! Please check your internet connection.";
    })
 })

