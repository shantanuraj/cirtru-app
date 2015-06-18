'use strict';

module.exports = {
	toSublet(listing) {
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
