'use strict';

module.exports = {
	base: 'https://cirtru.com/',

	listings: function(type) {
		switch(type) {
			case 'Roommates' : return this.roommates();
			case 'Furniture' : return this.furniture();
			case 'Sublets'   : return this.sublets();
			case 'Others'	 : return this.others();
			case 'Cars'      : return this.cars();
		}
	},
	
	roommates: function() {
		return this.base + 'api/v1/sfbayarea/roommates';
	},

	others: function() {
		return this.base + 'api/v1/sfbayarea/others';
	},

	cars: function() {
		return this.base + 'api/v1/sfbayarea/cars';
	},

	sublets: function() {
		return this.base + 'api/v1/sfbayarea/rentals';
	},

	furniture: function() {
		return this.others();
	},

	categories: ['Roommates', 'Sublets', 'Cars', 'Furniture', 'Others'],

	cardImage: function(type) {
		var s3   = 'https://s3-us-west-2.amazonaws.com/cirtru/images/listings';
		
		switch(type) {
			case 'Roommates' : return this.base + 'modules/core/img/others/homePageBackground.jpg';
			case 'Furniture' : return s3 + '/others/7f6cf1ad3144f8d178e52b5596eaa29b-pic.jpg';
			case 'Sublets'   : return s3 + '/housing/sublets/6d2b9f14225c373394208b05e87061a2-pic.jpg';
			case 'Others'	 : return s3 + '/others/7284ab245e23eaa243f4775644e7bca6-pic.jpg';
			case 'Cars'      : return s3 + '/cars/a4c97ae559c6c25e294ce33913de3287-pic.jpg';
		}
	}
	
};