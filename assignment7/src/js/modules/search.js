var htmlElements = require('./html-elements');	
var soundCloud = require('./soundcloud');
var template = require('./template');

var search = {
	action: function() {

		template.render(null, htmlElements.searchform.innerHTML);

		var submitButton = document.querySelector('#submit');
		submitButton.onclick = function() {
		
			var searchValue = document.querySelector('#song').value.toLowerCase();
			soundCloud.getData(searchValue, 'search-songs');

		}

	}

};
module.exports = search;