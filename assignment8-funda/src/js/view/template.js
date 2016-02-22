var htmlElements = require('../modules/htmlElements');	

var template = {
	render: function(htmlTemplate, data) {

		return new Promise(function(resolve, reject) { // Resolve = .then / Reject = .catch;

			var template = Handlebars.compile(htmlTemplate);
			var html = template(data);
			htmlElements.main.innerHTML = html;

		});

		

	}
};

module.exports = template;