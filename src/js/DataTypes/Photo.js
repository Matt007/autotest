"use strict"

module.exports = class Car {
	
	
	constructor(jsonData) {
		this.masked = null;
		this.damage = null;
		this.studio = null;
		this.sizes = null;
		
		if(typeof(jsonData)!='undefined') {
			this.parseJson(jsonData);
		}
		
	}
	
	
	parseJson(jsonData) {
		this.masked				= jsonData.masked;
		this.damage				= jsonData.damage;
		this.studio 			= jsonData.studio;
		this.sizes				= jsonData.sizes;
	}
	
	getMasked() { return this.masked; }
	getDamage() { return this.damage; }
	getStudio() { return this.region; }
	getSizes() { return this.sizes; }	
	
	getBaseUrl() {
		try {
			return this.getSizes().base.url;
		} catch(e){
			console.log('err image url', e.stack);
			return null;
		}
	}
	
	getOriginalUrl() {
		try {
			return this.getSizes().original.url;
		} catch(e){
			console.log('err image url', e.stack);
			return null;
		}		
	}
	

}