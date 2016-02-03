(function() {

	'Use Strict';

	var gps = {};

	// require extern library
	var eventTarget = require('./lib//eventTarget');
	// make every _eventTarget a new eventTarget
	var _eventTarget = new eventTarget();

	var debugging = require('./module/debugging');
	// make every _eventTarget a new eventTarget
	var _debugging = new debugging();

	// set all var's to false
	var currentPosition = currentPositionMarker = customDebugging = debugId = map = interval = intervalCounter = updateMap = false;
	// create the map function, add the options parameter
	function map(options) {
		// set _this to this to show the good scope of the this (and options)
		var _this = this;
		var _options = options;
		var constants = {
			SANDBOX: "SANDBOX",
			LINEAIR: "LINEAIR",
			GPS_AVAILABLE: 'GPS_AVAILABLE',
			GPS_UNAVAILABLE: 'GPS_UNAVAILABLE',
			POSITION_UPDATED: 'POSITION_UPDATED',
			REFRESH_RATE, 1000
		}
	}

	// Prototype every funtion so it can be used multiple times without overwrithing something

	// Test of GPS beschikbaar is (via geo.js) en vuur een event af
	map.prototype.testGPS = function() {

		debug_message("Controleer of GPS beschikbaar is...");

		_eventTarget.addListener(constants.GPS_AVAILABLE, map.startInterval);
		_eventTarget.addListener(constants.GPS_UNAVAILABLE, function(){debug_message('GPS is niet beschikbaar.')});

		(geo_position_js.init())?_eventTarget.fire(GPS_AVAILABLE):_eventTarget.fire(constants.GPS_UNAVAILABLE);

	}

	// Start een interval welke op basis van REFRESH_RATE de positie updated
	map.prototype.startInterval = function(event){

	    debug_message("GPS is beschikbaar, vraag positie.");
	    updatePosition();
	    interval = self.setInterval(updatePosition, REFRESH_RATE);
	    _eventTarget.addListener(POSITION_UPDATED, monitorLocations);

	}

	// Vraag de huidige positie aan geo.js, stel een callback in voor het resultaat
	map.prototype.updatePosition = function(){

	    intervalCounter ++;
	    geo_position_js.getCurrentPosition(setPosition, _geo_error_handler, {enableHighAccuracy:true});

	}

	// Callback functie voor het instellen van de huidige positie, vuurt een event af
	map.prototype.setPosition = function(position){

	    currentPosition = position;
	    _eventTarget.fire(constants.POSITION_UPDATED);
	    debug_message(intervalCounter+" positie lat:"+position.coords.latitude+" long:"+position.coords.longitude);

	}

	// Controleer de locaties en verwijs naar een andere pagina als we op een locatie zijn
	map.prototype.monitorLocations = function(event){
	    // Liefst buiten google maps om... maar helaas, ze hebben alle coole functies
	    for (var i = 0; i < locaties.length; i++) {
	        var locatie = {coords:{latitude: locaties[i][3],longitude: locaties[i][4]}};

	        if(calculateDistance(locatie, currentPosition)<locaties[i][2]){

	            // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
	            if(window.location!=locaties[i][1] && localStorage[locaties[i][0]]=="false"){
	                // Probeer local storage, als die bestaat incrementeer de locatie
	                try {
	                    (localStorage[locaties[i][0]]=="false")?localStorage[locaties[i][0]]=1:localStorage[locaties[i][0]]++;
	                } catch(error) {
	                    debug_message("Localstorage kan niet aangesproken worden: "+error);
	                }

	// TODO: Animeer de betreffende marker

	                window.location = locaties[i][1];
	                debug_message("Speler is binnen een straal van "+ locaties[i][2] +" meter van "+locaties[i][0]);
	            }
	        }
	    }
	}

	// Bereken het verchil in meters tussen twee punten
	map.prototype.calculateDistance = function(p1, p2){

	    var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
	    var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
	    return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);

	}

	map.prototype.generateMap = function(myOptions, canvasId){

	    debug_message("Genereer een Google Maps kaart en toon deze in #"+canvasId)
	    map = new google.maps.Map(document.getElementById(canvasId), myOptions);

	    var routeList = [];
	    // Voeg de markers toe aan de map afhankelijk van het tourtype
	    debug_message("Locaties intekenen, tourtype is: "+tourType);
	    for (var i = 0; i < locaties.length; i++) {

	        // Met kudos aan Tomas Harkema, probeer local storage, als het bestaat, voeg de locaties toe
	        try {
	            (localStorage.visited==undefined||isNumber(localStorage.visited))?localStorage[locaties[i][0]]=false:null;
	        } catch (error) {
	            debug_message("Localstorage kan niet aangesproken worden: "+error);
	        }

	        var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
	        routeList.push(markerLatLng);

	        markerRij[i] = {};
	        for (var attr in locatieMarker) {
	            markerRij[i][attr] = locatieMarker[attr];
	        }
	        markerRij[i].scale = locaties[i][2]/3;

	        var marker = new google.maps.Marker({
	            position: markerLatLng,
	            map: map,
	            icon: markerRij[i],
	            title: locaties[i][0]
	        });
	    }
	// TODO: Kleur aanpassen op het huidige punt van de tour
	    if(tourType == constants.LINEAIR){
	        // Trek lijnen tussen de punten
	        debug_message("Route intekenen");
	        var route = new google.maps.Polyline({
	            clickable: false,
	            map: map,
	            path: routeList,
	            strokeColor: 'Black',
	            strokeOpacity: .6,
	            strokeWeight: 3
	        });

	    }

	    // Voeg de locatie van de persoon door
	    currentPositionMarker = new google.maps.Marker({
	        position: kaartOpties.center,
	        map: map,
	        icon: positieMarker,
	        title: 'U bevindt zich hier'
	    });

	    // Zorg dat de kaart geupdated wordt als het POSITION_UPDATED event afgevuurd wordt
	    _eventTarget.addListener(constants.POSITION_UPDATED, setNewPosition);
	}

	map.prototype.isNumber = function(n) {
	  
	  return !isNaN(parseFloat(n)) && isFinite(n);

	}

	// Update de positie van de gebruiker op de kaart
	map.prototype.setNewPosition = function(event){

	    // use currentPosition to center the map
	    var newPos = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
	    map.setCenter(newPos);
	    currentPositionMarker.setPosition(newPos);

	}

	// Call the debuggin functions
	debuggin();

})();

