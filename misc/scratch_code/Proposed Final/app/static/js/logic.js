// assign the local url to a constant variable
const url = "http://127.0.0.1:5000/api/location"
const nutritionURL = "http://127.0.0.1:5000/api/nutrition"
// const summaryURL = "http://127.0.0.1:5000/api/summary";

// ****************
// DROPDOWN MENU
// ****************

// Fetch the JSON data
let nutritionData = d3.json(nutritionURL);

// Populate Dropdown Menu
function init() {
    let dropdownMenu = d3.select('#selDataset');
    let dropdownMenuTwo = d3.select('#selDatasetTwo');

    nutritionData.then(data => {
        // console.log(data);

        // Fill in dropdown menu
        for (let i = 0; i < data.length; i++) {
            let itemName = data[i]['Item'];
            let locationName = data[i]['Restaurant'];
            dropdownMenu.append('option').text(locationName + ': ' + itemName).property('value', itemName);
        };

        // Fill in dropdown menu Two
        for (let i = 0; i < data.length; i++) {
            let itemName = data[i]['Item'];
            let locationName = data[i]['Restaurant'];
            dropdownMenuTwo.append('option').text(locationName + ': ' + itemName).property('value', itemName);
        };

        // Read the dropdown value
        let selectedIndex = dropdownMenu.property('selectedIndex');
        let selectedIndexTwo = dropdownMenuTwo.property('selectedIndex');


        itemInfo(selectedIndex, selectedIndexTwo);
        // drawBubbleGraph(selectedIndex);
    });
};

function itemInfo(index, index2) {
    nutritionData.then(data => {
        console.log(data);

        // Select metadata section in HTML
        let demographicInfo = d3.select('#sample-metadata');
        let demographicInfoTwo = d3.select('#sample-metadata-two');

        // Clear metadata section
        demographicInfo.html('');
        demographicInfoTwo.html('');

        // Add new metadata to section
        demographicInfo.append('h5').html(`Calories: ${data[index].Calories}`);
        demographicInfo.append('h5').html(`Protein: ${data[index].Protein}`);
        demographicInfo.append('h5').html(`Sodium: ${data[index].Sodium}`);
        demographicInfo.append('h5').html(`Fiber: ${data[index].Fiber}`);

        // Add new metadata to section Two
        demographicInfoTwo.append('h5').html(`Calories: ${data[index2].Calories}`);
        demographicInfoTwo.append('h5').html(`Protein: ${data[index2].Protein}`);
        demographicInfoTwo.append('h5').html(`Sodium: ${data[index2].Sodium}`);
        demographicInfoTwo.append('h5').html(`Fiber: ${data[index2].Fiber}`);

    });
};


// Function called by DOM changes
function optionChanged() {
    let dropdownMenu = d3.select('#selDataset');
    let dropdownMenuTwo = d3.select('#selDatasetTwo');

    // Assign the value of the dropdown menu
    let selectedIndex = dropdownMenu.property('selectedIndex');
    let selectedIndexTwo = dropdownMenuTwo.property('selectedIndex');

  
    // Call function to update the chart
    itemInfo(selectedIndex, selectedIndexTwo);
    // drawBubbleGraph(selectedIndex);
};


// ****************
// MAP FEATURES
// ****************

// Create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Initialize all the LayerGroups that we'll use.
let layers = {
    McDonalds: new L.LayerGroup(),
    Burger_King: new L.LayerGroup(),
    Taco_Bell: new L.LayerGroup(),
    Chick_Fil_A: new L.LayerGroup(),
    Sonic: new L.LayerGroup(),
    Arbys: new L.LayerGroup(),
    Dairy_Queen: new L.LayerGroup(),
    Subway: new L.LayerGroup(),
};

// Create the map with our layers.
let map = L.map("map-id", {
    center: [44.94, -93.26],
    zoom: 10,
    layers: [
      layers.McDonalds,
      layers.Burger_King,
      layers.Taco_Bell,
      layers.Chick_Fil_A,
      layers.Sonic,
      layers.Arbys,
      layers.Dairy_Queen,
      layers.Subway,
    ]
});

// Add our "streetmap" tile layer to the map.
streetmap.addTo(map);

// Create an overlays object to add to the layer control.
let overlays = {
    "McDonald's": layers.McDonalds,
    "Burger King": layers.Burger_King,
    "Taco Bell": layers.Taco_Bell,
    "Chick-fil-A": layers.Chick_Fil_A,
    "Sonic Drive In": layers.Sonic,
    "Arby's": layers.Arbys,
    "Dairy Queen": layers.Dairy_Queen,
    "Subway": layers.Subway,
};

console.log(`Map: ${map}`);

// Create a control for our layers, and add our overlays to it.
L.control.layers(null, overlays, {
    collapsed: false
}).addTo(map);


// Initialize an object that contains icons for each layer group.
let icons = {
    McDonalds: L.ExtraMarkers.icon({
      markerColor: "red",
      shape: "circle"
    }),

    Burger_King: L.ExtraMarkers.icon({
      markerColor: "yellow",
      shape: "circle"
    }),

    Taco_Bell: L.ExtraMarkers.icon({
      markerColor: "purple",
      shape: "circle",
    }),
    Chick_Fil_A: L.ExtraMarkers.icon({
        markerColor: "orange",
        shape: "circle"
    }),

    Sonic: L.ExtraMarkers.icon({
        markerColor: "blue",
        shape: "circle"
    }),

    Arbys: L.ExtraMarkers.icon({
        markerColor: "black",
        shape: "circle",
    }),
    Dairy_Queen: L.ExtraMarkers.icon({
        markerColor: "pink",
        shape: "circle"
    }),

    Subway: L.ExtraMarkers.icon({
        markerColor: "green",
        shape: "circle"
    }),
};

// Perform an API call to the places dataset
d3.json(url).then(function(data) {
    // console.log(data)
    // Initialize restaurantName, which will be used as a key to access the appropriate layers and icons
    let restaurantName;

    // use a for loop to cycle through the locations
    for (let i = 0; i < data.length; i++) {

        if (data[i].Restaurant.includes("McDonald's")) {
            restaurantName = "McDonalds";
        }
        else if (data[i].Restaurant.includes("Burger King")) {
            restaurantName = "Burger_King";
        }
        else if (data[i].Restaurant.includes("Taco Bell")) {
            restaurantName = "Taco_Bell";
        }
        else if (data[i].Restaurant.includes("Chick-fil-A")) {
            restaurantName = "Chick_Fil_A";
        }
        else if (data[i].Restaurant.includes("Sonic Drive-In")) {
            restaurantName = "Sonic";
        }
        else if (data[i].Restaurant.includes("Arby's")) {
            restaurantName = "Arbys";
        }
        else if (data[i].Restaurant.includes("Dairy Queen")) {
            restaurantName = "Dairy_Queen";
        }
        else if (data[i].Restaurant.includes("Subway")) {
            restaurantName = "Subway";
        }

        // Create a new marker with the appropriate icon and coordinates.
        let newMarker = L.marker([data[i].Lat, data[i].Long_], {
            icon: icons[restaurantName]
            });

        // Add the new marker to the appropriate layer.
        newMarker.addTo(layers[restaurantName]);

        // Bind a popup to the marker that will  display on being clicked. This will be rendered as HTML.
        newMarker.bindPopup(`<h2>${data[i].Restaurant}</h2><hr><p>${data[i].Address}</p>
                            <hr><p>User Rating: ${data[i].Rating}</p>`);

        // center the map on a marker when you double click it
        // code found here for fit bounds: https://jeffreymorgan.io/articles/how-to-center-a-leaflet-map-on-a-marker/
        newMarker.on('dblclick', function() {
            var latLngs = [ newMarker.getLatLng() ];
            var markerBounds = L.latLngBounds(latLngs);
            map.fitBounds(markerBounds);  
        });
    }
})

// create a legend for the map
// helpful code found here: https://codepen.io/haakseth/pen/KQbjdO
// helpful website for finding numbers of colors found here: https://htmlcolorcodes.com/
var legend = L.control({position: 'topright'});

legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h3>Fast Food Restaurants in the Twin Cities</h3>";
    // div.innerHTML += "<h6>*Double click a marker to zoom in*</h6>";
    div.innerHTML += '<i style="background: #A42409"></i><span>McDonalds</span><br>';
    div.innerHTML += '<i style="background: #FFC300"></i><span>Burger King</span><br>';
    div.innerHTML += '<i style="background: #6A2C89"></i><span>Taco Bell</span><br>';
    div.innerHTML += '<i style="background: #FFA500"></i><span>Chick-fil-A</span><br>';
    div.innerHTML += '<i style="background: #0B75D3"></i><span>Sonic Drive-In</span><br>';
    div.innerHTML += '<i style="background: #000000"></i><span>Arbys</span><br>';
    div.innerHTML += '<i style="background: #DA70D6"></i><span>Dairy Queen</span><br>';
    div.innerHTML += '<i style="background: #008000"></i><span>Subway</span><br>';

    return div;
};

legend.addTo(map);
init();