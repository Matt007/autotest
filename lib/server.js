"use strict"

var express			= require('express');
var fileWorker		= require('file');
var path			= require('path');
var winston			= require('winston');
var nunjucks		= require('nunjucks');
var View			= require('./../lib/view');
//var router			= express.Router();

var routesConfig	= require('./../src/config/routes');



class server {
	
	constructor(environment) {
		this.controllers	= [];
		this.views			= [];
		this.log = this.getLogger();
		this.expressServer = express();
		this.environment = environment;
		
	}
	
	
	createRouter() {
		return express.Router();
	}
	
	getEnvironment() {
		return this.environment;
	}
	
	getLogger() {
		return {
			error:	winston.error,
			debug:	winston.debug,
			info:	winston.info
		}
	}
	
	getTemplatingEngine() {
		return nunjucks;
	}
	
	
	getControllerByName(name) {
		for(var i = 0; i<this.controllers.length; i++) {
			
			
//			console.log(this.controllers[i].name + ' == ' + name);

			if(this.controllers[i].name==name) {
				return this.controllers[i].class;
			}
		}
		return null;
	}
	
	
	boot() {
		this.loadControllers();
		this.loadViews();
		
		
		// Outsource!
		this.getTemplatingEngine().configure({ autoescape: false, express: this.expressServer });
		
		this.expressServer.use('/public', express.static('./public'));
		
		for (var route in routesConfig) {


			((route, routeConfig) => {
				var controllerAndAction = routesConfig[route].split('.');
				var controllerName		= controllerAndAction[0];
				var actionName			= controllerAndAction[1];
				
				var controller			= this.getControllerByName(controllerName);
				var action				= controllerName[actionName];
	
				var router = this.createRouter();
					
				router.use(route, (req, res) => {					
					controller[actionName](req, res, (contentResult) => {
						this.log.info('REQUEST', { path: route, controller: controllerName, action: actionName })
						res.send(contentResult);
					});
				})
				this.expressServer.use(router);
			})(route, routesConfig)

			
		};
		
	

		
		
		
		
		this.expressServer.listen(80, () => {
			
		})
		
		
		
	}
	
	renderViewSync(controllerActionPath, req, res) {

		let controllerName	= controllerActionPath.split('.')[0];
		let actionName		= controllerActionPath.split('.')[1];
	
		let controller		= this.getControllerByName(controllerName);
		
		
		return controller[actionName](req, res);
		
		


		
		
	}
	
	getView(path) {
		

		
		for(var i = 0; i < this.views.length; i++) {			
			if(this.views[i].path == path) {
				return this.views[i].class;
			}
		}
		return null;
	}
	
	addView(fullPath, path) {
		let newView = new View(path, fullPath, this.getTemplatingEngine(), this);
		this.views.push({
			path:		path,
			fullPath:	fullPath,
			class:		newView
		})
		
	}
	
	addController(name, path) {

		try {
			var _controllerClass = require(path);
			var controller = new _controllerClass();
				controller.setApp(this);
			this.controllers.push({
				name: 	name.split('.')[0],
				class:	controller
			});
			this.log.info('New Controller', { name: name, path: path})
		} catch(e) {
			this.log.error('addController: ' + e.stack);
			throw e;
		}

	}
	
	loadRoutes() {
		
	}

	loadViews() {
		var self = this;
		
		fileWorker.walkSync('./src/views', (rootPath, dirs, names) => {
			names.map(filename => {
				try {
					if(filename!='.DS_Store') {
						var _path = rootPath + "/" + filename;
						//var _path = '../'+ rootPath + "/" + filename;
						
						var viewPathElements = _path.split('.')
						
						
						
						self.addView(_path, viewPathElements[viewPathElements.length-2].replace('/src/views/', '').replace('/', '.'));
					}

				} catch(e) {
					self.log.error('Error adding view: ' + _path, { error: e.stack });
				}
				
			});
			
			
		})
	}
	
	loadControllers() {
		var self = this;
		
		fileWorker.walkSync('./src/controller', (rootPath, dirs, names) => {
			names.map(filename => {
				try {
					if(filename!='.DS_Store') {
						var _path = '../'+ rootPath + "/" + filename;
						self.addController(filename, _path);
					}

				} catch(e) {
					self.log.error('Error adding controller: ' + _path);
				}
				
			});
			
			
		})
	}
	
}

module.exports = server;