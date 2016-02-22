var htmlElements = require('../modules/htmlElements');	
var template = require('../view/template');

var settings = {
	showForm: function() {

		template.render(htmlElements.settingsForm.innerHTML)
		.then(function() {

			htmlElements.submitButton.addEventListener('click', this.getData, false);

		});
		
	},
	getData: function() {

		// render settings form
		


	}
};
module.exports = settings;