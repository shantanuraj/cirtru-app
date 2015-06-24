'use strict';

var React = require('react-native'),
    Colors = require('../core/Colors'),
    Images = require('./util/Images'),
    Info = require('./util/Info'),
    Amenities = require('./util/Amenities'),
    LocationBox = require('./util/LocationBox'),
    ContactButton = require('./util/ContactButton'),
    Rooms = require('./util/Rooms'),
    SubletInfo = require('./util/SubletInfo'),
    CarInfo = require('./util/CarInfo'),
    window = require('Dimensions').get('window');

var {
    Text,
    View,
    StyleSheet,
    ScrollView,
} = React;

var Listing = React.createClass({
    render() {
        var listing = this.props.listing,
            images  = listing.images.pics,
            cost    = listing.cost,
            info    = listing.description,
            circle  = listing.circle,
            address = listing.address;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <Images images={images} style={styles.images} />
                    <View style={styles.infoContainer}>
                        <View style={styles.row}>
                            <Text style={styles.circle}>{circle}</Text>
                            <Text style={styles.cost}>${cost}</Text>
                        </View>
                    </View>
                    <LocationBox location={address} />
                    {this.optionalContent()}
                    <Info description={info}/>
                </ScrollView>
				<View style={styles.fabContainer}>
					<ContactButton />
				</View>
			</View>
        );
    },

    optionalContent() {
        var extras = this.props.listing.data;
        switch (this.props.listing.category) {
            case 'roommates': return (
                <View>
                    <Amenities amenities={extras.amenities} />
                    <Rooms rooms={extras.rooms} beds={extras.beds} baths={extras.baths}/>
                </View>
            );
            case 'sublets': return (
                <View>
                    <Amenities amenities={extras.amenities} />
                    <SubletInfo sublet={extras} />
                </View>
            );
            case 'cars': return (
                <CarInfo car={extras} />
            );
        }
    }
});

var styles = StyleSheet.create({
    container: {
		flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	backgroundColor: Colors.background,
  	},

    images: {
        height: 300,
        width: window.width,
    },

    infoContainer: {
        padding: 6,
        width: window.width,
        justifyContent: 'space-between',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.3)',
        top: 260,
        left: 0,
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    circle: {
        fontSize: 16,
        fontWeight: '300',
        color: Colors.white,
    },

	cost: {
		color: Colors.white,
		fontSize: 24,
		fontWeight: '500',
	},

    scroll: {
        backgroundColor: Colors.grey,
    },

    fabContainer: {
  		position: 'absolute',
  		bottom: 16,
  		right: 16,
  		borderRadius: 24,
  	},
});

module.exports = Listing;
