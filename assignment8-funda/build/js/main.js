(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
	'use strict';
	
	var routes = require('./routes/routes');
	var firstVisitToday = require('./modules/firstVisitToday');

	var app = {
		launcher: function() {

			routes.init();
			firstVisitToday.check();

		}
	}

	app.launcher();

})();
},{"./modules/firstVisitToday":4,"./routes/routes":11}],2:[function(require,module,exports){
var htmlElements = require('./htmlElements');	
var userSettings = require('./userSettings');
var funda = require('./funda');
var dataFilter = require('./dataFilter');
var template = require('../view/template');
var spinner = require('./spinner');
var pushMessage = require('./pushMessage');

assembleComponents = {
	allHouses: function() {

		spinner.start();
		funda.returnAllHouses()
			.then(function(data) {

				pushMessage.pushNewHouses(); // for development purposes

				template.render(htmlElements.houseList.innerHTML, data)
					.then(function() {
						htmlElements.main.classList.add("fade-in");
						setTimeout(function() { 
							htmlElements.main.classList.remove("fade-in");
						}, 1000);
					});

			});

	},
	newHouses: function() {

		spinner.start();
		funda.returnNewHouses()
			.then(function(data) {

				template.render(htmlElements.newHouses.innerHTML, data)
					.then(function() {
						htmlElements.main.classList.add("fade-in");
						setTimeout(function() { 
							htmlElements.main.classList.remove("fade-in");
						}, 1000);
					});

			});

	},
	settings: function() {

		spinner.start();
		userSettings.checkLocalStorage();

	},
	error: function() {

		var content = {
			title: "404",
			message: "Sorry page not found"
		}
		template.render(htmlElements.error.innerHTML, content);

	}
}

module.exports = assembleComponents;
},{"../view/template":12,"./dataFilter":3,"./funda":5,"./htmlElements":6,"./pushMessage":8,"./spinner":9,"./userSettings":10}],3:[function(require,module,exports){
var localStorageMod = require('../modules/local-storage');

var dataFilter = {

	// ToDo: api url part newest first instead of this? Then there is also paginering :)

	devideHouses: function(data) {

		return new Promise(function(resolve, reject) {

			var _data = data;
			var houseData = _data.Objects;
			var addedToday = [];
			var notAddedToday = [];

			_.filter(houseData, function(matched) {

				if ( matched.AangebodenSindsTekst === "Vandaag" ) {

					matched.today = true;
					addedToday.push(matched);

				} else {

					notAddedToday.push(matched);		    	

				};
			   
			});

			var cobinedData = {
				data: _data,
				addedToday: addedToday,
				notAddedToday: notAddedToday
			}

			resolve(cobinedData);

		});

	},

	filterNewHouses: function(data) {

		return new Promise(function(resolve, reject) {

			var _data = data;
			var houseData = _data.Objects;
			var addedToday = [];

			_.filter(houseData, function(matched) {

				if ( matched.AangebodenSindsTekst === "Vandaag" ) {

					matched.today = true;
					addedToday.push(matched);

				}
			   
			});

			resolve(addedToday);

		});

	},

	combineHousesData: function(combinedData) {

		var _combinedData = combinedData;
		var _data = _combinedData.data;
		var _addedToday = _combinedData.addedToday;
		var _notAddedToday = _combinedData.notAddedToday;

		return new Promise(function(resolve, reject) {

			localStorageMod.get('userSettings')
			.then(function(userSettings) {
				
				var _userSettings = userSettings;

				var meta = {
					city: _userSettings.city,
					budget: "€" + _userSettings.minPrice + " - €" + _userSettings.maxPrice,
					total: _data.TotaalAantalObjecten,
					totalToday: _addedToday.length,
				}

				var allHouses = _addedToday.concat(_notAddedToday);

				var content = {
					meta: meta,
					houses: allHouses
				}

				resolve(content);

			});

		});

	},

	returnAllHouses: function(data) {

		return new Promise(function(resolve, reject) {

			dataFilter.devideHouses(data)
				.then(dataFilter.combineHousesData)
				.then(function(combinedData) {
					
					resolve(combinedData);

				});

		});

	}
};

module.exports = dataFilter;
},{"../modules/local-storage":7}],4:[function(require,module,exports){
var localStorageMod = require('./local-storage');
var pushMessage = require('./pushMessage');

var firstVisitToday = {
	check: function() {

		// Date from: http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
		var date = new Date();
		var dd = date.getDate();
		var mm = date.getMonth() +1;
		var yyyy = date.getFullYear();

		var today = mm +'/' + dd + '/' + yyyy;

		localStorageMod.get('today')
			.then(function(localStorageDate) {
				
				if ( localStorageDate ) {

					if ( today > localStorageDate ) {

						pushMessage.pushNewHouses();

					}
					
					firstVisitToday.setNewDate(today);


				} else {

					firstVisitToday.setNewDate(today);

				}

			})
			.catch(function() {

				firstVisitToday.setNewDate(today);

			});

	},
	setNewDate: function(today) {

		return localStorageMod.set('today', today);

	}
};

module.exports = firstVisitToday;
},{"./local-storage":7,"./pushMessage":8}],5:[function(require,module,exports){
var pushMessage = require('./pushMessage');
var htmlElements = require('./htmlElements');
var localStorageMod = require('./local-storage');
var dataFilter = require('./dataFilter');
var template = require('../view/template');

var funda = {
	// The call to the API
	APICall: function(url) {

		return new Promise(function(resolve, reject) { // Resolve = .then / Reject = .catch;

			var request = new XMLHttpRequest();

			request.onloadend = function(response) {

				resolve(request.response);

			}

			request.onerror = reject;

			request.open('GET', url, true);
			request.send();

		});

	},
	// Create api url
	APIUrl: function(settings) {

		var apiUrl;

		if ( settings ) {

			var _settings = settings;

			url = {
				BaseUrl: "http://funda.kyrandia.nl/feeds/Aanbod.svc",
				key: "e2d60e885b8742d4b0648300e3703bd7",
				type: "type=koop",
				city: _settings.city,
				radius: _settings.radius,
				minPrice: _settings.minPrice,
				maxPrice: _settings.maxPrice,
				pageNumber: "&page=1",
				pageSize: "&pagesize=25",
				new: _settings.new
			}

			if ( _settings.new ) {

				url.new = _settings.new;
				return apiUrl = url.BaseUrl + "/json/" + url.key + "/?" + url.type + "&zo=/" + url.city + "/+" + url.radius + "km/" + url.minPrice + "-" + url.maxPrice + "/" + url.new;

			} else {

				return apiUrl = url.BaseUrl + "/json/" + url.key + "/?" + url.type + "&zo=/" + url.city + "/+" + url.radius + "km/" + + url.minPrice + "-" + url.maxPrice + "/" + url.pageNumber + url.pageSize;

			};

		} else {

			userSettings.checkLocalStorage();

		};

	},
	// handle Data
	returnAllData: function() {

		return new Promise(function(resolve, reject) {

			// retreve userSettings
			var rawData = localStorageMod.get("userSettings")
				.then(funda.APIUrl)
				.then(funda.APICall)
				.then(function(data) {

					rawData = JSON.parse(data);	
					if ( rawData.TotaalAantalObjecten === 0) { 

						var content = {
		    				title: "Geen Matches",
		    				message: "Sorry, er zijn geen huizen gevonden in deze catagorie"
		    			}
		    			template.render(htmlElements.error.innerHTML, content);
						
					}

					resolve(rawData);

				})
				.catch(function(err) {

					window.location.hash = '#settings';
					
				});

		});

	},

	returnNewHouses: function() {

		return new Promise(function(resolve, reject) {

			var data = funda.returnAllData()
				.then(dataFilter.filterNewHouses)
				.then(function(filteredData) {

					resolve(filteredData);

				})
				.catch(function(err) {

					console.error((err.stack) ? err.stack : err);

				});

		});

	},

	returnAllHouses: function() {

		return new Promise(function(resolve, reject) {

			var data = funda.returnAllData()
				.then(dataFilter.returnAllHouses)
				.then(function(filteredData) {

					resolve(filteredData);

				})
				.catch(function(err) {

					console.error((err.stack) ? err.stack : err);
					
				});

		});

	}
};

module.exports = funda;
},{"../view/template":12,"./dataFilter":3,"./htmlElements":6,"./local-storage":7,"./pushMessage":8}],6:[function(require,module,exports){
var htmlElements = {
	main: document.querySelector('main'),
	settingsForm: document.querySelector('#settingsForm'),
	houseList: document.querySelector('#houseList'),
	newHouses: document.querySelector('#new-houses'),
	loading: document.querySelector('#loading'),
	error: document.querySelector('#error')
};

module.exports = htmlElements;
},{}],7:[function(require,module,exports){
var localStorageMod = {
	set: function(name, data) {

		return new Promise(function(resolve, reject) {

			var stringifiedData = JSON.stringify(data);
			localStorage.setItem(name, stringifiedData);

			resolve();
			reject();

		});

	},

	get: function(localObj) {

		return new Promise(function(resolve, reject) {

			var storageData = localStorage.getItem(localObj);
			var data = JSON.parse(storageData);

			resolve(data);

		});

	}
};

module.exports = localStorageMod;
},{}],8:[function(require,module,exports){
var dataFilter = require('../modules/dataFilter');
var funda = require('../modules/funda');
var localStorageMod = require('../modules/local-storage');

var pushMessage = {
	
	confirm: function() {
				
		new Promise(function(resolve, reject) {

			Notification.requestPermission();
			return resolve();	

		}).then(function() {

			var content = {
				title: "Gelukt",
				body: "Elke dag krijgt u een push notificatie met passende huizen die zijn toegevoegd terwijl u sliep ",
				icon: "../img/funda-logo.png",
				link: null
			}
			this.showNotification(content);
			window.location.hash = "#thuis/" + settings.city;

		});


	},

	showNotification: function(content) {

		var _content = content;

		var notification = new Notification(_content.title, {
		  icon: _content.icon,
		  body: _content.body
		});

		notification.onclick = function() {

			if ( _content.link != null ) {

				window.location.hash = '#thuis-vandaag/:city';

			} else {

				notification.close();

			}
		  
		};

	},

	pushNewHouses: function() {

		funda.returnNewHouses()
			.then(function(data) {

				if ( data.length ) {

					localStorageMod.get('userSettings')
					.then(function(userSettings) {

						var _userSettings = userSettings;

						var totalNewHouses = data.length;
						var content = {
							body: "zie meer!",
							icon: data[0].Foto,
							link: "/funda/#thuis-vandaag/" + _userSettings.city
						};
						if ( data.length > 1 ) {
							content.title = "Er zijn vandaag " + data.length + " mogelijke huizen toegevoegd in " + _userSettings.city;
						} else {
							content.title = "Er is vandaag 1 mogelijk thuis toegevoegd in " + _userSettings.city;
						}

						pushMessage.showNotification(content);

					});

				} else {

					var content = {
						title: "Helaas",
						body: "Er zijn vandaag geen niewe huizen toegevoegd",
						icon: "../img/funda.png",
						link: null
					};

					pushMessage.showNotification(content);

				}

			});

	}
};

module.exports = pushMessage
},{"../modules/dataFilter":3,"../modules/funda":5,"../modules/local-storage":7}],9:[function(require,module,exports){
var htmlElements = require('./htmlElements');
var template = require('../view/template');

var spinner = {
	start: function() {
		
		template.render(htmlElements.loading.innerHTML);

	}
};

module.exports = spinner;
},{"../view/template":12,"./htmlElements":6}],10:[function(require,module,exports){
var htmlElements = require('../modules/htmlElements');
var template = require('../view/template');
var localStorageMod = require('./local-storage');
var pushMessage = require('./pushMessage');

var userSettings = {
	// check if there is relevant data in local storage
	checkLocalStorage: function() {

		localStorageMod.get('userSettings')
			.then(function(resolve) {

				var content = {
					action: "Veranderen uw instellngen"
				}
				userSettings.showForm(content);
				userSettings.retreveSettings(resolve);

			})
			.catch(function() {

				var content = {
					action: "Sla uw instellingen op"
				}
				userSettings.showForm(content);

			})


	},
	// Call render function and get button
	showForm: function(content) {

		template.render(htmlElements.settingsForm.innerHTML, content)
		.then(function() {

			var submitButton = document.querySelector('#submit-button');
			submitButton.addEventListener('click', userSettings.saveSettings, false);

		});
		
	},
	// Fill the form with the data from local Storage
	retreveSettings: function(localStorageSettings) {

		var setSettings = localStorageSettings;
		// ToDo: NOT ON THIS WAY!!!!!!!!
		document.querySelector('#city').value = setSettings.city;
		document.querySelector('#radius').value = setSettings.radius;
		document.querySelector('#min-price').value = setSettings.minPrice;
		document.querySelector('#max-price').value = setSettings.maxPrice;
		document.querySelector('#notification').checked = setSettings.notification;

	},
	// Put the data in local storage
	saveSettings: function() {

		settings = {
			city: document.querySelector('#city').value.toLowerCase(),
			radius: document.querySelector('#radius').value,
			minPrice: document.querySelector('#min-price').value,
			maxPrice: document.querySelector('#max-price').value,
			notification: document.querySelector('#notification').checked
		};

		localStorageMod.set("userSettings", settings)
			.then(function() {

				if ( Notification.permission === 'granted' ) {

					window.location.hash = "#thuis/" + settings.city;

				} else {

					pushMessage.confirm();

				}

			});

	}
};
module.exports = userSettings;
},{"../modules/htmlElements":6,"../view/template":12,"./local-storage":7,"./pushMessage":8}],11:[function(require,module,exports){
var htmlElements = require('../modules/htmlElements');	
var template = require('../view/template');
var assembleComponents = require('../modules/assembleComponents');

var routes = {
	init: function() {

		routie({
			
			'': function() {
				window.location.hash = '#thuis/city';
			},
			'settings': function() {
				assembleComponents.settings();
			},
			'thuis-vandaag/:city': function() {
				assembleComponents.newHouses();	
			},
			'thuis/:city': function() {
				assembleComponents.allHouses();		
			},
			'*': function() {
				assembleComponents.error();
			}	

		});

	}
}

module.exports = routes;
},{"../modules/assembleComponents":2,"../modules/htmlElements":6,"../view/template":12}],12:[function(require,module,exports){
var htmlElements = require('../modules/htmlElements');	

var template = {
	render: function(htmlTemplate, data) {

		return new Promise(function(resolve, reject) {

			var template = Handlebars.compile(htmlTemplate);
			var html = template(data);
			htmlElements.main.innerHTML = html;

			resolve();

		});

	}
};

module.exports = template;
},{"../modules/htmlElements":6}]},{},[1])