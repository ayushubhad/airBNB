console.log("my maptoken is:", mapToken);

// Best practice for Mapbox is to set the token globally like this:
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // Ensure you have a style URL
    center: coordinates, // starting position [lng, lat]
    zoom: 9// starting zoom
});




if (coordinates && coordinates.length === 2) {
    const marker = new mapboxgl.Marker({ color: "red" }) 
        .setLngLat(coordinates)                         
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }) 
            .setHTML("<h8>Exact location provided after booking.</h8>")
        )
        .addTo(map);
} else {
    console.log("Skipping marker: No valid coordinates found for this listing.");
}