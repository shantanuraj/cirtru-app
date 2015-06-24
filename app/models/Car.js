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
			category: 'cars',
			address: listing.location,
			coordinates: {
				long: listing.gmaps.loc[0],
				lat: listing.gmaps.loc[1],
			},
			description: listing.description,
			owner: listing.user,

			data: {
				make: listing.make,
				model: listing.model,
				subModel: listing.subModel,
				year: listing.year,
				color: listing.color,
				fuel: listing.fuel,
				mileage: listing.mileage,
				transmission: listing.transmission,
				vin: listing.vin,
				titleStatus: listing.titleStatus,
			},
		}
		return values;
	}
}
