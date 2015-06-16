'use strict';

module.exports = {
	base: 'https://cirtru.com/',
	
	roommates: function() {
		return this.base + 'api/v1/sfbayarea/roommates';
	},

	home: function() {
		return ['Roommates', 'Rentals', 'Sublets', 'Furniture', 'For Sale'];
	},

	cardImage: function(item) {
		var s3   = 'https://s3-us-west-2.amazonaws.com/cirtru/images/listings';
		
		switch(item) {
			case 'Roommates' : return this.base + 'modules/core/img/others/homePageBackground.jpg';
			case 'Furniture' : return s3 + '/others/7f6cf1ad3144f8d178e52b5596eaa29b-pic.jpg';
			case 'Sublets'   : return s3 + '/housing/sublets/6d2b9f14225c373394208b05e87061a2-pic.jpg';
			case 'Others'	 : return s3 + '/others/7284ab245e23eaa243f4775644e7bca6-pic.jpg';
			case 'Cars'      : return s3 + '/cars/a4c97ae559c6c25e294ce33913de3287-pic.jpg';
		}
	}
	
};