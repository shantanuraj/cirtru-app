'use strict';

module.exports = {
	toRoommate(listing) {
		var values = {
			images: listing.images,
			title: listing.title,
			location: listing.primaryLocation,
			cost: 0,
			circle: listing.circle,
			id: listing._id,
			category: 'roommates',
			address: listing.location,
			coordinates: {
				long: listing.gmaps.loc[0],
				lat: listing.gmaps.loc[1],
			},
			description: listing.description,
			owner: listing.user,

			data: {
				type: listing.type,
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
				beds: listing.beds,
				baths: listing.bath,
				rent: [],
				rooms: listing.rooms,
			}
		};

		listing.propertyAmenities.forEach(amenity => values.data.amenities[amenity] = true);

		listing.rooms.forEach(room => {
			room.roomOccupancy.forEach(function (occupant) {
				if (occupant.roommateStatus === 'Looking') {
					values.data.rent.push(occupant.rent);
				}
			});
		});

		values.cost = values.data.rent.reduce((x, y) => x < y ? x : y);

		return values;
	}
};
