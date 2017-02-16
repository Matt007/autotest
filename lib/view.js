"use strict";

var fs = require('fs');

module.exports = class View {
	
	constructor(path, fullPath, nunjucks, app) {
		this.app			= app;
		this.path			= path;
		this.fullPath		= fullPath;
		this.nunjucks		= nunjucks;

		this.templateData	= fs.readFileSync(fullPath, 'utf8');

	}
	
	
	getTemplateData() {
		return this.templateData;
	}
	
	
	renderSync(parameters) {
		return this.nunjucks.renderString(this.getTemplateData(), parameters);
	}
	
	render(parameters) {
		
		parameters.view = (ControllerAndAction) => {
			return this.app.renderViewSync(ControllerAndAction);
		}
		
		
		parameters.component = (id, component) => {
			return "<div id='" + id +"'><script>window.react_component_" + component + "('" + id + "')</script></div>";

		}
		
		return new Promise((fulfill, reject) => {
			this.nunjucks.renderString(this.getTemplateData(), parameters, (err, renderedContent) => {
				if(err) {
					console.log('view rendering error');
					console.log(err.stack);
					reject(err);
				} else {
					fulfill(renderedContent);
				}
				
			})			
		});
		

		

	}
	
}