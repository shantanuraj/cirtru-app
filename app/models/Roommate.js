'use strict';

module.exports = {
	toRoommate: function (listing) {
		var values = {
			rent: [],
			gender: [],
			smoking: [],
			diet: [],
			from: [],
			location: listing.primaryLocation,
			type: listing.type,
			images: listing.images,
			circle: listing.circle,
		};

		listing.rooms.forEach(function (room, index) {
		    
		    room.roomOccupancy.forEach(function (occupant) {
		        if (occupant.roommateStatus === 'Looking') {
		            values.rent.push(occupant.rent);
		            values.gender.push(occupant.gender);
		            values.smoking.push(occupant.smoking);
		            values.diet.push(occupant.diet);
		            values.from.push(occupant.from);
		        }
		    });

		    if (index === listing.rooms.length - 1) {
		        values.rent = Math.min.apply(Math,values.rent);
		        values.smoking = values.smoking[0];
		        values.diet = values.diet[0];
		        values.from = values.from[0];
		        
		        if ((values.gender.indexOf('Any') !== -1)
		        || (values.gender.indexOf('Male') !== -1 && values.gender.indexOf('Female') !== -1)) {
		         	values.gender = 'Any'
		        } else {
		         	values.gender = values.gender[0];
		        }
		    }

		});

		return values;
	}
};