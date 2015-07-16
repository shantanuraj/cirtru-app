'use strict';

var Furniture = require('../models/Furniture'),
	Roommate = require('../models/Roommate'),
	Sublet = require('../models/Sublet'),
	Other = require('../models/Other'),
	Car = require('../models/Car'),
	_ = require('immutable');

module.exports = {
	base: 'http://localhost:3000/',

	categories: ['Roommates', 'Sublets', 'Cars', 'Furniture', 'Others'],

	listings(type) {
		switch(type) {
			case 'Furniture': return this.furniture();
			case 'Roommates': return this.roommates();
			case 'Sublets': return this.sublets();
			case 'Others': return this.others();
			case 'Cars': return this.cars();
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
		var s3 = 'https://s3-us-west-2.amazonaws.com/cirtru/images/listings';

		switch(type) {
			case 'Furniture': return s3 + '/others/7f6cf1ad3144f8d178e52b5596eaa29b-pic.jpg';
			case 'Roommates': return this.base + 'modules/core/img/others/homePageBackground.jpg';
			case 'Sublets': return s3 + '/housing/sublets/6d2b9f14225c373394208b05e87061a2-pic.jpg';
			case 'Others': return s3 + '/others/7284ab245e23eaa243f4775644e7bca6-pic.jpg';
			case 'Cars': return s3 + '/cars/a4c97ae559c6c25e294ce33913de3287-pic.jpg';
		}
	},

	miniCardImage(type) {
		var s3 = 'https://s3-us-west-2.amazonaws.com/cirtru/images/listings';

		switch(type) {
			case 'Furniture': return s3 + '/others/2baa548639818db0412a752655dedf63-pic.jpg';
			case 'Roommates': return s3 + '/roommates/680c6b1380c1b679ea1cd7579753ed2e-pic.jpg';
			case 'Sublets': return s3 + '/housing/sublets/d48d12c9a567de7b1591b53a95997f0b-pic.jpg';
			case 'Others': return s3 + '/others/01492cc1384a4df05a32bb42806c7384-pic.jpg';
			case 'Cars': return s3 + '/cars/0b2db656963706ca23860f34b8db1784-pic.jpg';
		}
	},

	adaptListing(type, raw) {
		switch(type) {
			case 'Furniture': return Furniture.toFurniture(raw);
			case 'Roommates': return Roommate.toRoommate(raw);
			case 'Sublets': return Sublet.toSublet(raw);
			case 'Others': return Other.toOther(raw);
			case 'Cars': return Car.toCar(raw);
		}
	},

	adaptUserListings(raw) {
		var adapted = {};
        var key = '';
        _.Map(raw).forEach((list, type) => {
			switch(type) {
				case 'roommates': key = 'Roommates'; break;
				case 'rentals': key = 'Sublets'; break;
				case 'cars': key = 'Cars'; break;
				default: key = 'Others';
			}
			if (list) {
				adapted[key] = list.map(item => this.adaptListing(key, item));	
			} else {
				adapted[key] = [];
			}
		});

		return adapted;
	},

	getListingUrl(type) {
		switch(type) {
			case 'roommates': return this.base + 'api/v1/sfbayarea/roommates/';
			case 'sublets': return this.base + 'api/v1/sfbayarea/rentals/';
			case 'cars': return this.base + 'api/v1/sfbayarea/cars/';
			default: return this.base + 'api/v1/sfbayarea/others/';
		}
	},

	getFilterUrl(type, query) {
		switch(type) {
			case 'Roommates': return this.base + 'api/v1/sfbayarea/roommates?' + query;
			case 'Furniture': return this.base + 'api/v1/sfbayarea/others?category=furniture&' + query;
			case 'Sublets': return this.base + 'api/v1/sfbayarea/rentals?' + query;
			case 'Others': return this.base + 'api/v1/sfbayarea/others?category=others&' + query;
			case 'Cars': return this.base + 'api/v1/sfbayarea/cars?' + query;	
		}
	},

	roommatesFilterSet: {
		propertyTypes: ['Private Room', 'Shared Room'],
		minPrice: [0, 500, 1000, 1500, 2000, 3000, 4000],
		maxPrice: [500, 1000, 1500, 2000, 3000, 4000, 5000],
		gender: ['Male', 'Female'],
		diet: ['Vegan', 'Vegetarian (No Eggs)', 'Vegetarian (Eggs ok)'],
		drinking: ['Doesn\'t drink', 'Drinks occasionally', 'Drinks frequently'],
		smoking: ['Doesn\'t smoke', 'Smokes', 'Smokes outside only'],
		pets: ['With no pets', 'With pet dog ok', 'With pet cat ok', 'With any pet ok'],
	},

	subletsFilterSet: {
		propertyTypes: ['Apartment', 'House'],
		minPrice: [0, 500, 1000, 1500, 2000, 3000, 4000],
		maxPrice: [500, 1000, 1500, 2000, 3000, 4000, 5000],
	},

	carsFilterSet: {
		minPrice: [2000, 3000, 4000, 7000, 10000, 15000, 20000, 25000, 30000],
		maxPrice: [3000, 4000, 7000, 10000, 15000, 20000, 25000, 30000],
		minMileage: [0,  10000, 25000, 75000, 100000, 15000],
		maxMileage: [10000, 25000, 75000, 100000, 150000],
		titleStatus: ['Clean', 'Lien', 'Salvage', 'Rebuilt', 'Other'],
	},

	getFilterOptions(type) {
		var base = this.base + 'filterOptions/';
		switch(type) {
			case 'Roommates': return base + 'roommates';
			case 'Furniture': return base + 'forsale/furniture';
			case 'Sublets': return base + 'rentals';
			case 'Others': return base + 'forsale/others';
			case 'Cars': return base + 'cars';
		}
	},

	makeFilterOptions(adapted) {
		var raw = _.Map(adapted).mapKeys(key => {
			switch(key) {
				case 'make': return 'filterMakeObj';
				case 'year': return 'filterYearObj';
				case 'color': return 'filterColorObj';
				case 'circle': return 'filterCircleObj';
				case 'location': return 'filterPrimaryLocationOptionsObj';
			}
		});
		return raw.toObject();
	},

	adaptOptions(raw) {
		var adapted = _.Map(raw).mapKeys(key => {
			switch(key) {
				case 'filterMakeObj': return 'make';
				case 'filterYearObj': return 'year';
				case 'filterColorObj': return 'color';
				case 'filterCircleObj': return 'circle';
				case 'filterPrimaryLocationOptionsObj': return 'location';
			}
		});
		return adapted.toObject();
	},

	getContactUrl(type, id) {
		switch (type) {
			case 'roommates': return this.base + 'roommates/contact/' + id;
			case 'sublets': return this.base + 'rentals/contact/' + id;
			case 'cars': return this.base + 'cars/contact/' + id;
			default: return this.base + 'others/contact/' + id;
		}
	},

	getContactPayload(type, listing, message) {
		var payload = {
			message: message,
		};
		switch (type) {
			case 'roommates': payload.roommate = listing; break;
			case 'sublets': payload.rental = listing; break;
			case 'cars': payload.car = listing; break;
			default: payload.other = listing;
		}
		return payload;
	},

	circlesList() {
		return this.base + 'companiesList';
	},

	login() {
		return this.base + 'auth/signin';
	},

	signup() {
		return this.base + 'auth/signup';
	},

	changePassword() {
		return this.base + 'users/password';
	},

	resetPassword() {
		return this.base + 'auth/forgot';
	},

	userListings() {
		return this.base + 'users/ownlistings';
	},

	updateUser() {
		return this.base + 'users';
	},

	reverifyPersonal() {
		return this.base + 'verify/email/new';
	},

	updateWorkEmail() {
		return this.base + '/verify/workEmail/new';
	},
};
