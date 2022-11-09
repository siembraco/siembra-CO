
export default function MapSiembraco() {
  let mapStore;
  initMapSiembraco();
	console.log('hola mapa');

  function initMapSiembraco() {
    mapStore = new google.maps.Map(document.getElementById("mapa-result-siembraco"), {
      center: { lat: 4.6097548, lng: -74.1655719 },
      zoom: 10,
      styles: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },{    
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ]
     });
    resultData();
	document.getElementsByClassName('locate_btn').innerHTML = 'Prueba'
  }

  function resultData() {
    let data = document.querySelectorAll(".data-result")
    eqfeed_callback(data);
  }

  function eqfeed_callback(features) {
    const image = "https://www.siembraco.com/sites/default/files/2022-03/icon-location-green.png";

    for (let i = 0; i < features.length; i++) {
      let dataCleanLat = features[i].attributes[0].value;
      let info = features[i].innerHTML;
      let dataClean = dataCleanLat.replace(/[:_"lng""lat"{} ]/g, '');
      
      const coords = dataClean.split(',');
      const latLng = new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));

      const infowindow = new google.maps.InfoWindow({
        content: info,
      });
      const marker = new google.maps.Marker({
        position: latLng,
        map: mapStore,
        animation: google.maps.Animation.DROP,
        icon: image,
      });
      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map: mapStore,
          shouldFocus: false,
        });
      });
    }
  };
}
