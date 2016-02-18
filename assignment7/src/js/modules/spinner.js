var htmlElements = require('./html-elements');
var template = require('./template');

var spinner = {
	start: function() {
		
		template.render(null, htmlElements.loading.innerHTML);

	},
};
module.exports = spinner;