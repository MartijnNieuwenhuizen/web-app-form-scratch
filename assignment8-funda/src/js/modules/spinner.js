var htmlElements = require('./htmlElements');
var template = require('../view/template');

var spinner = {
	start: function() {
		
		template.render(htmlElements.loading.innerHTML);

	}
};

module.exports = spinner;