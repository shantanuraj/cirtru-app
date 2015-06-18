'use strict';

module.exports =  {
	toCar(listing) {
		var values = {
			images: listing.images,
			title: listing.make + ' ' + listing.model,
			location: listing.primaryLocation,
			cost: listing.sellingPrice,
			circle: listing.circle,
			id: listing._id,
		}
		return values;
	}
}
