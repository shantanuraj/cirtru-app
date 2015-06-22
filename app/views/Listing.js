'use strict';

var React = require('react-native'),
    Colors = require('../core/Colors'),
    Images = require('./util/Images'),
    Circle = require('./util/Circle'),
    Price = require('./util/Price'),
    Info = require('./util/Info'),
    Amenities = require('./util/Amenities'),
    LocationBox = require('./util/LocationBox'),
    ContactButton = require('./util/ContactButton'),
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
            price   = listing.cost,
            info    = listing.description,
            circle  = listing.circle,
            address = listing.address;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <Images images={images} style={styles.images} />
                    <Circle circle={circle} />
                    <Price price={price} />
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
            case 'roommates':
            case 'sublets'  : return <Amenities amenities={extras.amenities} />;
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
    scroll: {
        backgroundColor: Colors.grey,
    },
    images: {
        height: 300,
        width: window.width,
    },
    fabContainer: {
  		position: 'absolute',
  		bottom: 16,
  		right: 16,
  		borderRadius: 24,
  	},
});

module.exports = Listing;
