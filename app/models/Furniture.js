'use strict';

var Other = require('./Other');

module.exports = {
	toFurniture: function(listing) {
		return Other.toOther(listing);
	}
}