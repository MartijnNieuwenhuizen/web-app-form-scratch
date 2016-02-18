var htmlElements = require('../modules/html-elements');	
var search = require('../modules/search');
var soundCloud = require('../modules/soundcloud');
var template = require('../view/template');

var routes = {
	init: function() {

		// routers for all the elements on the page
		routie({
			// if the url has no hash, set hash to search
			'': function() {
				routie('search');
			},
			'search': function() {
		    	search.action();
		    },
			'latest': function() {
		    	soundCloud.getData();
		    },
		    '/:id': function() {
	    		template.showDetail(window.rawData);
		    },
		    '*': function() {
		    	var content = {
		    		title: "404",
		    		message: "Sorry page not found"
		    	}
		    	template.render(content, htmlElements.error.innerHTML);
		    }
		});

	}
}

module.exports = routes;