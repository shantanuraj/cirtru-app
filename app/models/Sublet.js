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
					pool: false,
					parking: false,
					laundry: false,
					gym: false,
					ac: false,
					tv: false,
					security: false,
					heating: false,
					elevator: false,
					internet: false,
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
		listing.propertyAmenities.forEach(amenity => values.data.amenities[amenity] = true);
		return values;
	}
}
