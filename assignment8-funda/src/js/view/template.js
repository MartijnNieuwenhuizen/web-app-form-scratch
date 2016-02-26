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