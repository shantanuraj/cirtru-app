'use strict';

module.exports = {
	toRoommate: function (listing) {
		var values = {
			images: listing.images,
			title: listing.type,
			location: listing.primaryLocation,
			cost: 0,
			circle: listing.circle,
			id: listing._id,
			
			rent: [],
			gender: [],
			smoking: [],
			diet: [],
			from: [],			
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
		        values.cost = Math.min.apply(Math, values.rent);
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