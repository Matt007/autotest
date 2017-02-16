"use strict";

module.exports = class Controller {
	
	constructor() {
		
	}
	
	setApp(app) {
		this.app = app;
	}
	
	getApp(app) {
		return this.app;
	}
	
	renderSync(view, parameters) {
		return this.app.getView(view).renderSync(parameters);
	}
	
	render(view, parameters) {
		return new Promise((fulfill, reject) => {
			this.app.getView(view).render(parameters).then(renderedContent => {
				fulfill(renderedContent);
			}).catch(err => {
				reject(err);
			});
		});
	}
	
}