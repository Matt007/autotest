import	Request from 'browser-request';
var		Promise = require('es6-promise').Promise;
import	Car	from './DataTypes/Car';
var 	superAgent	= require('superagent');
import	URLQueryBuilder from "url-query-builder";

import localCarData from './localcardata';

module.exports = class Api {
	
	constructor() {
	}
	

	
	getCars() {
		var url = 'https://s3.amazonaws.com/elasticbeanstalk-us-east-1-253941727413/interview/car.json';
		return new Promise((fulfill, reject) => {
				
			Request(url, (err, res) => {
			
				if(err) {
					// cross origin issue probably -> let's use our local copy
					res = localCarData;
				}
				
				let cars = res.cars;
				
				let result = cars.map( carJsonData => (
					new Car(carJsonData)
				));
				
				fulfill(result)
					
			})
		})
		
	}
	
	
	getCarById(id) {


		return new Promise((fulfill, reject) => {
				
			this.getCars().then(cars => {
				for(var i = 0; i<cars.length; i++) {
					if(cars[i].getId() == id) {
						fulfill (cars[i]);
					}
				}
				fulfill(null);
			}).catch(e => {
				reject(e);
			})
		})


	}
	
	
	
}