var htmlElements = require('./html-elements');	

var gesture = {
	nextSong: function(data) {

		var currentData = data;
		var songCount = 0;
		var cache = 0;
		var hashId = window.location.hash.slice(5);

		var matchingSong = _.find(currentData, function(num) { 
			
			songCount ++;

			if ( num.id == hashId ) {
				
				songCount --;
				cache = songCount;

			}

		});

		var swipe = new Hammer(htmlElements.main);

		swipe.on('swipeleft', function() {

			if ( data ) {
				cache ++;
				var nextSong = data[cache].id;
				window.location.hash = '/:id' + nextSong;
			}

			htmlElements.main.classList.add('left');

			setTimeout(function() {
				htmlElements.main.classList.remove('left');
			},300);

		});
		swipe.on('swiperight', function() {
			
			if ( data ) {
				cache --;
				var nextSong = data[cache].id;
				window.location.hash = '/:id' + nextSong;
			}

			htmlElements.main.classList.add('right');
			
			setTimeout(function() {
				htmlElements.main.classList.remove('right');
			},300);

		});
		
	}

};
module.exports = gesture;