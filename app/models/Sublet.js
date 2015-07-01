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
			category: 'sublets',
			address: listing.location,
			coordinates: {
				long: listing.gmaps.loc[0],
				lat: listing.gmaps.loc[1],
			},
			description: listing.description,
			owner: listing.user,

			data: {
				amenities: {
					laundry: listing.laundry === 'yes' ? true : false,
					pool: listing.swimmingPool === 'yes' ? true : false,
					gym: listing.gym === 'yes' ? true : false,
					security: listing.security === 'gated' ? true : false,
					smoking: listing.smoking === 'OK' ? true : false,
				},
				type: listing.type,
				deposit: listing.deposit,
				diet: listing.eatPreference,
				beds: listing.bedroom,
				baths: listing.bath,
				pets: listing.pets === 'OK' ? true : false,
				start: listing.startDate,
				end: listing.endDate,
				owner: listing.user,
			}
		}
		return values;
	}
}
