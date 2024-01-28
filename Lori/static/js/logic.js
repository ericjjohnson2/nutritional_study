// Create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Initialize all the LayerGroups that we'll use.
let layers = {
    McDonalds: new L.LayerGroup(),
    Burger_King: new L.LayerGroup(),
    Taco_Bell: new L.LayerGroup(),
};

// Create the map with our layers.
let map = L.map("map-id", {
    center: [46.36, -94.78],
    zoom: 7,
    layers: [
      layers.McDonalds,
      layers.Burger_King,
      layers.Taco_Bell,
    ]
});

// Add our "streetmap" tile layer to the map.
streetmap.addTo(map);

// Create an overlays object to add to the layer control.
let overlays = {
    "McDonald's": layers.McDonalds,
    "Burger King": layers.Burger_King,
    "Taco Bell": layers.Taco_Bell,
};
  
// Create a control for our layers, and add our overlays to it.
L.control.layers(null, overlays, {
    collapsed: false
}).addTo(map);


// Initialize an object that contains icons for each layer group.
let icons = {
    McDonalds: L.ExtraMarkers.icon({
    //   icon: 'ion-android-pizza',
    //   iconColor: "white",
      markerColor: "red",
      shape: "circle"
    }),

    Burger_King: L.ExtraMarkers.icon({
    //   icon: 'ion-settings',
    //   iconColor: "white",
      markerColor: "yellow",
      shape: "circle"
    }),

    Taco_Bell: L.ExtraMarkers.icon({
    //   icon: 'fa-bell',
    //   iconColor: "white",
      markerColor: "purple",
      shape: "circle",
    //   prefix: 'fa'
    })
};

// Initialize restaurantName, which will be used as a key to access the appropriate layers and icons
let restaurantName;


// use a for loop to cycle through the locations
for (let i = 0; i < locations.length; i++) {
    
    if (locations[i].Restaurant == "McDonald's") {
        restaurantName = "McDonalds";
    }

    else if (locations[i].Restaurant == "Burger King") {
        restaurantName = "Burger_King";
    }

    else if (locations[i].Restaurant == "Taco Bell") {
        restaurantName = "Taco_Bell";
    }

    // // Create a new marker with the appropriate icon and coordinates.
    // let newMarker = L.marker([locations[i].Lat, locations[i].Long_]);

    // Create a new marker with the appropriate icon and coordinates.
    let newMarker = L.marker([locations[i].Lat, locations[i].Long_], {
         icon: icons[restaurantName]
         });

    // Add the new marker to the appropriate layer.
    newMarker.addTo(layers[restaurantName]);

    // Bind a popup to the marker that will  display on being clicked. This will be rendered as HTML.
    newMarker.bindPopup(`<h1>${locations[i].Restaurant}</h1><hr><p> 
     Street Address: ${locations[i].Address}</p>
    <hr><p> City: ${locations[i].City}</p>`);
}

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Restaurants</h4>";
    div.innerHTML += '<i style="background: #A42409"></i><span>McDonalds</span><br>';
    div.innerHTML += '<i style="background: #FFC300"></i><span>Burger King</span><br>';
    div.innerHTML += '<i style="background: #6A2C89"></i><span>Taco Bell</span><br>';

    return div;
};

legend.addTo(map);