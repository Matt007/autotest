"use strict"


var moment = require('moment');
import	Photo from './Photo';

module.exports = class Car {
	
	
	constructor(jsonData) {
		this.id = null;
		this.link = null;
		this.region = null;
		this.year = null;
		this.make = null;
		this.model = null;
		this.trim = null;
		this.modelTrim = null;
		this.photos = [];
		this.photosReady = null;
		this.price = null;
		this.mileage = null;
		this.bodyStyle = null;
		this.transmission = null;
		this.driveTrain = null;
		this.available = null;
		this.sold = null;
		this.firstListingDate = null;
		
		
		if(typeof(jsonData)!='undefined') {
			this.parseJson(jsonData);
		}
	}
	
	
	parseJson(jsonData) {
		this.id					= jsonData.carid;
		this.link				= jsonData.link;
		this.region 			= jsonData.region;
		this.year				= jsonData.year;
		this.make				= jsonData.make;
		this.model				= jsonData.model;
		this.trim				= jsonData.trim;
		this.modelTrim			= jsonData.model_trim;
		this.photos 			= jsonData.photos.map(jsonPhotoData => ( new Photo(jsonPhotoData) ));
		this.photosReady 		= jsonData.photosReady;
		this.price 				= jsonData.price;
		this.mileage 			= jsonData.mileage;
		this.bodyStyle 			= jsonData.bodyStyle;
		this.transmission 		= jsonData.transmission;
		this.driveTrain 		= jsonData.driveTrain;
		this.available 			= jsonData.available;
		this.sold				= jsonData.sold;
		this.firstListingDate	= jsonData.firstListingDate;
	}
	
	getId() { return this.id; }
	getLink() { return this.link; }
	getRegion() { return this.region; }
	getYear() { return this.year; }
	getMake() { return this.make; }
	getModel() { return this.modeld; }
	getTrim() {  return this.trim; }
	getModelTrim() {  return this.modelTrim; }
	getPhotos() {  return this.photos; }
	getPhotosReady() {  return this.photosReady; }	
	getPrice() {  return this.price; }
	getMileage() {  return this.mileage; }	
	getBodyStyle() {  return this.bodyStyle; }	
	getTransmission() {  return this.transmission; }
	getDriveTrain() {  return this.driveTrain; }
	isAvailable() {  return this.available; }
	isSold() {  return this.sold; }
	getFirstListingDate() { return this.firstListingDate; }
	

	
	
	
	
	

}