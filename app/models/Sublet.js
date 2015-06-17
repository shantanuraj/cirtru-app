'use strict';

module.exports = {
	toSublet: function(listing) {
		console.log('Converting to sublet');
		var values = {
			images: listing.images,
			title: listing.title,
			location: listing.primaryLocation,
			cost: listing.sellingPrice,
			circle: listing.circle,
			id: listing._id,
		}

		return values;
	}
}