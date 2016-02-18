var htmlElements = require('./html-elements');
var template = require('../view/template');

var spinner = {
	start: function() {
		
		template.render(null, htmlElements.loading.innerHTML);

	},
};
module.exports = spinner;