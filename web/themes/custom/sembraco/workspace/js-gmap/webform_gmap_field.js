/*
var user_location;
(function ($, Drupal, drupalSettings){
    'use strict';
    user_location = drupalSettings.user_location;
    Drupal.behaviors.appendVar = {
        attach: function(context, settings) {
           
            var myvar = 'this is the var i want to send';
            $('#edit-map-test').once('appendVar').val(user_location);
        }
    }
})(jQuery, Drupal, drupalSettings);
*/

let map, infoWindow;
var previousMarker;
var defaultLatlng = { lat: 4.6097548, lng: -74.1655719 };
function initMap() {
  console.log("mi libreria");
  var user_location = drupalSettings.user_location;
  if (user_location) { defaultLatlng = JSON.parse(user_location); }

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: defaultLatlng,
    mapTypeId: "roadmap",
  });


  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  // For edit wbform display (retrive the stored value and displayo on map)
  if (user_location) {
    previousMarker = new google.maps.Marker({
      position: JSON.parse(user_location),
      map: map
    });
    console.log(JSON.parse(user_location), "JSON.parse(user_location)");
    map.setCenter(JSON.parse(user_location));
    map.setZoom(14);
  } else {
    document.getElementById("webform_gmap_field").value = JSON.stringify(defaultLatlng, null, 2);
    locateMe(map);
  }
  //console.log(JSON.parse(user_location));
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    document.getElementById("webform_gmap_field").value = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2);
    if (previousMarker)
      previousMarker.setMap(null);
    if (current_marker_red)
      current_marker_red.setMap(null);
    previousMarker = new google.maps.Marker({
      position: mapsMouseEvent.latLng,
      map: map
    });
  });

  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("div");
  locationButton.className = "locate_btn";
  locationButton.textContent = "Localizame";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    locateMe(map, true);
  });


  geocoder = new google.maps.Geocoder();
}

var current_location_marker;
var current_marker_red;
function locateMe(map, isclicked = false) {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        /*infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);*/

        document.getElementById("webform_gmap_field").value = JSON.stringify(pos, null, 2);

        map.setCenter(pos);
        map.setZoom(14);
        const locate_icon = "/modules/contrib/webform_gmap_field/images/locate.png";
        const red_icon = "/modules/contrib/webform_gmap_field/images/red_marker.png";


        //codeLatLng(pos.lat, pos.lng);     

        if (current_location_marker && current_marker_red) {
          current_location_marker.setMap(null);
          current_marker_red.setMap(null);
        }
        if (previousMarker)
          previousMarker.setMap(null);
        current_location_marker = new google.maps.Marker({
          position: pos,
          icon: locate_icon,
          map: map
        });
        current_marker_red = new google.maps.Marker({
          position: pos,
          map: map,
          zIndex: 100,
          icon: red_icon
        });

      },
      () => {
        if (isclicked == true) {
          alert("Your location service is off, please turn it on first from the browser setting.");
        }

        //handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    //console.log("no browser location support");
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  //infoWindow.open(map);
}

function codeLatLng(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({ 'latLng': latlng }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      //console.log(results);
      if (results[1]) {
        var indice = 0;
        for (var j = 0; j < results.length; j++) {
          if (results[j].types[0] == 'locality') {
            indice = j;
            break;
          }
        }
        alert('The good number is: ' + j);
        console.log(results[j]);
        for (var i = 0; i < results[j].address_components.length; i++) {
          if (results[j].address_components[i].types[0] == "locality") {
            //this is the object you are looking for City
            city = results[j].address_components[i];
          }
          if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
            //this is the object you are looking for State
            region = results[j].address_components[i];
          }
          if (results[j].address_components[i].types[0] == "country") {
            //this is the object you are looking for
            country = results[j].address_components[i];
          }
        }

        //city data
        alert(city.long_name + " || " + region.long_name + " || " + country.short_name)


      } else {
        alert("No results found");
      }
      //}
    } else {
      alert("Geocoder failed due to: " + status);
    }
  });
}

if(document.getElementsByClassName("mapa-result-siembraco")){
  console.log("mapa --custom ");
  var defaultLatlngStore = { lat: 4.6097548, lng: -74.1655719 };

  function initMapSiembraco(){
    map2 = new google.maps.Map(document.getElementsByClassName("mapa-result-siembraco"), {
      zoom: 6,
      center: defaultLatlngStore,
     
    });
  }
}

