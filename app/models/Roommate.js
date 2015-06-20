'use strict';

module.exports = {
	toRoommate(listing) {
		var values = {
			images: listing.images,
			title: listing.type,
			location: listing.primaryLocation,
			cost: 0,
			circle: listing.circle,
			id: listing._id,

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
				beds: listing.beds,
				bath: listing.bath,
				rent: [],
				gender: [],
				smoking: [],
				diet: [],
				from: [],
			}
		};

		listing.propertyAmenities.forEach(amenitiy => {
			values.data.amenities[amenitiy] = true;
		});

		listing.rooms.forEach(function (room, index) {

		    room.roomOccupancy.forEach(function (occupant) {
		        if (occupant.roommateStatus === 'Looking') {
		            values.data.rent.push(occupant.rent);
		            values.data.gender.push(occupant.gender);
		            values.data.smoking.push(occupant.smoking);
		            values.data.diet.push(occupant.diet);
		            values.data.from.push(occupant.from);
		        }
		    });

		    if (index === listing.rooms.length - 1) {
		        values.cost = Math.min.apply(Math, values.data.rent);
		        values.data.smoking = values.data.smoking[0];
		        values.data.diet = values.data.diet[0];
		        values.data.from = values.data.from[0];

		        if ((values.data.gender.indexOf('Any') !== -1)
		        || (values.data.gender.indexOf('Male') !== -1 && values.data.gender.indexOf('Female') !== -1)) {
		         	values.data.gender = 'Any'
		        } else {
		         	values.data.gender = values.data.gender[0];
		        }
		    }

		});
		return values;
	}
};
