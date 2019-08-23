mapboxgl.accessToken = 'pk.eyJ1IjoicGFsbGF2amFpbjQwOSIsImEiOiJjanppMzVpY3YwNjBoM21wZGlxaXdlcWR0In0.FjfQWr9yrPNnaV4RPU89ZQ';
var layerIDs = []; // Will contain a list used to filter against.
var filterInput = $('#filter-input');
let isSidebarOpen = false;


var places = {
    "type": "FeatureCollection",
    "features": [{
            "type": "Feature",
            "properties": {
                "Name": "Red Fort",
                "Address": "Netaji Subhash Marg, Lal Qila, Chandni Chowk, New Delhi, Delhi 110006",
                "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Red_Fort_Independence_Day.jpg/220px-Red_Fort_Independence_Day.jpg",
                "icon": "Red Fort"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [77.2410, 28.6562]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Qutab Minar",
                "Address": "Mehrauli, New Delhi, Delhi 110030",
                "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Qutub_Minar_764.jpg/220px-Qutub_Minar_764.jpg",
                "icon": "Qutab Minar"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [77.1855, 28.5245]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "India Gate",
                "Address": "Rajpath, India Gate, New Delhi, Delhi 110001",
                "img": "https://delhitourism.travel/images/places-to-visit/headers/india-gate-delhi-entry-fee-timings-holidays-reviews-header.jpg",
                "icon": "India Gate"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [77.2295, 28.6129]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lotus Temple",
                "Address": "Lotus Temple Rd, Bahapur, Shambhu Dayal Bagh, Kalkaji, New Delhi, Delhi 110019",
                "img": "https://upload.wikimedia.org/wikipedia/commons/f/fc/LotusDelhi.jpg",
                "icon": "Lotus Temple"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [77.2588, 28.5535]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Humayun’s Tomb",
                "Address": "Mathura Road Opposite, Hazrat Nizamuddin Aulia Dargah, Nizamuddin, New Delhi, Delhi 110013",
                "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Humayun%27s_Tomb%2C_Delhi%2C_India_2019.jpg/360px-Humayun%27s_Tomb%2C_Delhi%2C_India_2019.jpg",
                "icon": "Humayun’s Tomb"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [77.2507, 28.5933]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Raj Ghat",
                "Address": "Behind Red Fort, New Delhi, Delhi 110006",
                "img": "https://upload.wikimedia.org/wikipedia/en/8/8d/RajGhat.JPG",
                "icon": "Raj Ghat"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [77.2495, 28.6406]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Safdarjung Tomb",
                "Address": " Airforce Golf Course, Delhi Race Club, New Delhi, Delhi 110021",
                "img": "https://upload.wikimedia.org/wikipedia/commons/d/dc/Safdar_Jang%E2%80%99s_Tomb%2C_Delhi_.jpg",
                "icon": "Safdarjung Tomb"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [77.2106, 28.5893]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Purana Qila",
                "Address": "Mathura Rd, Near Delhi Zoo, New Delhi, Delhi 110003",
                "img": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Purana_Qila_ramparts%2C_Delhi.jpg",
                "icon": "Purana Qila"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [77.2437, 28.6096]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Tughlaqabad Fort",
                "Address": "Tughlakabad, New Delhi, Delhi 110044",
                "img": "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/01/24/Pictures/tuglaqabad-fort_a6bb523c-00b1-11e8-8651-33050e64100a.jpg",
                "icon": "Tughlaqabad Fort"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [77.2601, 28.5143]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Jama Masjid",
                "Address": "Jama Masjid Rd, Jama Masjid, Chandni Chowk, New Delhi, Delhi 110006",
                "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Jama_Masjid_-_In_the_Noon.jpg/1200px-Jama_Masjid_-_In_the_Noon.jpg",
                "icon": "Jama Masjid"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [77.2334, 28.6507]
            }
        }

    ]
};

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [77.2106, 28.5893, ],
    zoom: 10
});

map.on('load', function () {
    // Add a GeoJSON source containing place coordinates and information.
    map.addSource('places', {
        "type": "geojson",
        "data": places
    });

    places.features.forEach(function (feature) {
        var symbol = feature.properties['icon'];
        var layerID = symbol;
        var feature = feature.properties;


        // Add a layer for this symbol type if it hasn't been added already.
        if (!map.getLayer(layerID)) {
            map.addLayer({
                "id": layerID,
                "type": "symbol",
                "source": "places",
                "layout": {
                    "icon-image": "monument" + "-15",
                    "icon-allow-overlap": true,
                    "icon-size": 2,
                    "text-field": symbol,
                    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
                    "text-size": 11,
                    "text-transform": "uppercase",
                    "text-letter-spacing": 0.05,
                    "text-offset": [0, 1.5]
                },
                "paint": {
                    "text-color": "#202",
                    "text-halo-color": "#fff",
                    "text-halo-width": 2
                },
                "filter": ["==", "icon", symbol]
            });

            layerIDs.push(layerID);
        }

    });
    displayMatches(layerIDs);
    listenForKeyupOnSearchBar();
    listenForClickOnMarkers();
    changeCursorToPointerAtMonuments();
    changePointerToCursorAtMap();

});

function listenForKeyupOnSearchBar() {
    filterInput.keyup(function (e) {
        var value = e.target.value.trim().toLowerCase();
        let matchExp = new RegExp(value, 'gi');
        let matchedID = layerIDs.filter(layer => matchExp.test(layer));
        clearSuggestion();
        displayMatches(matchedID);
        layerIDs.forEach(function (layerID) {
            if (matchedID.includes(layerID)) {
                map.setLayoutProperty(layerID, 'visibility', 'visible');
            } else {
                map.setLayoutProperty(layerID, 'visibility', 'none');
            }
        });

    });
}
//displaying pop up
function listenForClickOnMarkers() {
    layerIDs.forEach(layerID => {
        map.on('click', layerID, function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var name = e.features[0].properties.Name;
            var address = e.features[0].properties.Address;
            var link = e.features[0].properties.Address;

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(`
                <img src = "${e.features[0].properties.img}">
                    <p><strong>${name}</strong><p>
                    <p>${address}</p>
                    <a target= "_black" href = "https://en.wikipedia.org/wiki/${name}">
                        <p>Click for more information</p>
                     </a>
                `)
                .addTo(map);
        })
    })
}

function changeCursorToPointerAtMonuments() {
    layerIDs.forEach(layerID => {
        map.on('mouseenter', layerID, function () {
            map.getCanvas().style.cursor = 'pointer';
        });
    })
}

function changePointerToCursorAtMap() {
    layerIDs.forEach(layerID => {
        map.on('mouseleave', layerID, function () {
            map.getCanvas().style.cursor = '';
        });
    })
}
//Displaying matches in search bar

function displayMatches(matches) {
    if (matches.length == 0) {
        $('.suggestions').append('<li>No Result Found</li>');
    } else {
        matches.forEach(function (match) {
            let monumentString = `
      <li><a target= "_black" href = "https://en.wikipedia.org/wiki/${match}">
        <h5>${match}</h5>
        </a>
        </li>`;
            $('.suggestions').append(monumentString);
        })
    }
}

function clearSuggestion() {
    $('.suggestions').html("");
}


//side bar open and close

function openOrCloseSideBar() {
    if (isSidebarOpen == false) {
        openNav();
        changeIconToClose();
    } else {
        closeNav();
        changeIconToopen();
    }
    isSidebarOpen = !isSidebarOpen;
}

function changeIconToClose() {
    $('#arrowIcon').removeClass();
    $('#arrowIcon').addClass('fas fa-angle-double-left');
}

function changeIconToopen() {
    $('#arrowIcon').removeClass();
    $('#arrowIcon').addClass('fas fa-angle-double-right');
}

function openNav() {
    $("#mySidebar").css('width', '25%');
    $("#main").css('marginLeft', '25%');
}

function closeNav() {
    $("#mySidebar").css('width', '0');
    $("#main").css('marginLeft', '0');
}