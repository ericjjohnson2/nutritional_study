// define a function that will select the color of the circle based on the restaurant name
function markerColor(restaurant) {
    if (restaurant == "Burger King") {
        return "yellow";
    }
    else if (restaurant == "McDonald's") {
        return "red";
    }
    else if (restaurant == "Taco Bell") {
        return "purple";
    }
}

// Define arrays to hold the created city and state markers
let restaurantMarkers = [];

// Loop through locations, and create the the restaurant markers.
for (let i = 0; i < locations.length; i++) {
    // Setting the marker radius for the state by passing population into the markerSize function
    restaurantMarkers.push(
      L.circle([locations[i].Lat, locations[i].Long_], {
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: markerColor(locations[i].Restaurant),
        radius: 500
      })
    );
}

// Create the base layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

// Create two separate layer groups: one for the city markers and another for the state markers.
let restaurants = L.layerGroup(restaurantMarkers);

// Create a baseMaps object.
let baseMaps = {
    "Street Map": street
};

// Create an overlay object.
let overlayMaps = {
    "Restaurants": restaurants
};


// Define a map object.
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 7,
    layers: [street, restaurants]
});

// Pass our map layers to our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);
  
    