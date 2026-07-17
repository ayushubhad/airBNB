console.log("my maptoken is:", mapToken);

// Best practice for Mapbox is to set the token globally like this:
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // Ensure you have a style URL
    center: [72.8774, 19.0760], // starting position [lng, lat]
    zoom: 9 // starting zoom
});