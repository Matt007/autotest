"use strict";

var Controller = require('./../../lib/controller');


module.exports = class HomeController extends Controller {
	
	constructor() {
		super();
	}
	
	
	home(req, res, send) {
		this.render('home', {}).then(renderedContent => {
			send(renderedContent)
		});
	}
	
	details(req, res, send) {
		
		this.render('details', { }).then(renderedContent => {
			send(renderedContent)
		});
	}

	
}