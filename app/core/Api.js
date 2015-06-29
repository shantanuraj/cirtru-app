'use strict';

var Furniture = require('../models/Furniture'),
	Roommate = require('../models/Roommate'),
	Sublet = require('../models/Sublet'),
	Other = require('../models/Other'),
	Car = require('../models/Car'),
	_ = require('immutable');

module.exports = {
	base: 'http://192.168.1.102:3000/',

	categories: ['Roommates', 'Sublets', 'Cars', 'Furniture', 'Others'],

	listings(type) {
		switch(type) {
			case 'Furniture' : return this.furniture();
			case 'Roommates' : return this.roommates();
			case 'Sublets'   : return this.sublets();
			case 'Others'	 : return this.others();
			case 'Cars'      : return this.cars();
		}
	},

	roommates() {
		return this.base + 'api/v1/sfbayarea/roommates';
	},

	others() {
		return this.base + 'api/v1/sfbayarea/others?category=others';
	},

	cars() {
		return this.base + 'api/v1/sfbayarea/cars';
	},

	sublets() {
		return this.base + 'api/v1/sfbayarea/rentals';
	},

	furniture() {
		return this.base + 'api/v1/sfbayarea/others?category=furniture';
	},

	cardImage(type) {
		var s3   = 'https://s3-us-west-2.amazonaws.com/cirtru/images/listings';

		switch(type) {
			case 'Furniture' : return s3 + '/others/7f6cf1ad3144f8d178e52b5596eaa29b-pic.jpg';
			case 'Roommates' : return this.base + 'modules/core/img/others/homePageBackground.jpg';
			case 'Sublets'   : return s3 + '/housing/sublets/6d2b9f14225c373394208b05e87061a2-pic.jpg';
			case 'Others'	 : return s3 + '/others/7284ab245e23eaa243f4775644e7bca6-pic.jpg';
			case 'Cars'      : return s3 + '/cars/a4c97ae559c6c25e294ce33913de3287-pic.jpg';
		}
	},

	miniCardImage(type) {
		var s3   = 'https://s3-us-west-2.amazonaws.com/cirtru/images/listings';

		switch(type) {
			case 'Furniture' : return s3 + '/others/2baa548639818db0412a752655dedf63-pic.jpg';
			case 'Roommates' : return s3 + '/roommates/680c6b1380c1b679ea1cd7579753ed2e-pic.jpg'
			case 'Sublets'   : return s3 + '/housing/sublets/d48d12c9a567de7b1591b53a95997f0b-pic.jpg';
			case 'Others'	 : return s3 + '/others/01492cc1384a4df05a32bb42806c7384-pic.jpg';
			case 'Cars'      : return s3 + '/cars/0b2db656963706ca23860f34b8db1784-pic.jpg';
		}
	},

	adaptListing(type, raw) {
		switch(type) {
			case 'Furniture' : return Furniture.toFurniture(raw);
			case 'Roommates' : return Roommate.toRoommate(raw);
			case 'Sublets'   : return Sublet.toSublet(raw);
			case 'Others'	 : return Other.toOther(raw);
			case 'Cars'      : return Car.toCar(raw);
		}
	},

	adaptUserListings(raw) {
		var adapted = {};
		
        var key = '';
        _.Map(raw).forEach((list, type) => {
			switch(type) {
				case 'roommates' : key = 'Roommates'; break;
				case 'rentals'   : key = 'Sublets'; break;
				case 'others'    : key = 'Others'; break;
				case 'cars'		 : key = 'Cars'; break;
			}
            adapted[key] = list.map(item => this.adaptListing(key, item));
		});
		
		return adapted;
	},

	login() {
		return this.base + 'auth/signin';
	},

	signup() {
		return this.base + 'auth/signup';
	},

	userListings() {
		return this.base + 'users/ownlistings';
	}
};
