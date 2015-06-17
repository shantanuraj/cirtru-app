'use strict';

var Furniture = require('../models/Furniture'),
	Roommate = require('../models/Roommate'),
	Sublet = require('../models/Sublet'),
	Other = require('../models/Other'),
	Car = require('../models/Car');

module.exports = {
	base: 'https://cirtru.com/',

	listings: function(type) {
		switch(type) {
			case 'Furniture' : return this.furniture();
			case 'Roommates' : return this.roommates();
			case 'Sublets'   : return this.sublets();
			case 'Others'	 : return this.others();
			case 'Cars'      : return this.cars();
		}
	},
	
	roommates: function() {
		return this.base + 'api/v1/sfbayarea/roommates';
	},

	others: function() {
		return this.base + 'api/v1/sfbayarea/others?category=others';
	},

	cars: function() {
		return this.base + 'api/v1/sfbayarea/cars';
	},

	sublets: function() {
		return this.base + 'api/v1/sfbayarea/rentals';
	},

	furniture: function() {
		return this.base + 'api/v1/sfbayarea/others?category=furniture';
	},

	categories: ['Roommates', 'Sublets', 'Cars', 'Furniture', 'Others'],

	cardImage: function(type) {
		var s3   = 'https://s3-us-west-2.amazonaws.com/cirtru/images/listings';
		
		switch(type) {
			case 'Furniture' : return s3 + '/others/7f6cf1ad3144f8d178e52b5596eaa29b-pic.jpg';
			case 'Roommates' : return this.base + 'modules/core/img/others/homePageBackground.jpg';
			case 'Sublets'   : return s3 + '/housing/sublets/6d2b9f14225c373394208b05e87061a2-pic.jpg';
			case 'Others'	 : return s3 + '/others/7284ab245e23eaa243f4775644e7bca6-pic.jpg';
			case 'Cars'      : return s3 + '/cars/a4c97ae559c6c25e294ce33913de3287-pic.jpg';
		}
	},

	adaptListing: function(type, raw) {
		switch(type) {
			case 'Furniture' : return Furniture.toFurniture(raw);
			case 'Roommates' : return Roommate.toRoommate(raw);
			case 'Sublets'   : return Sublet.toSublet(raw);
			case 'Others'	 : return Other.toOther(raw);
			case 'Cars'      : return Car.toCar(raw);
		}
	},
};