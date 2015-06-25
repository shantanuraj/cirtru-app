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
    Toast = require('./util/Toast'),
    window = require('Dimensions').get('window');

var {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} = React;

var Listing = React.createClass({
    getInitialState() {
        return {isToastVisisble: false};
    },

    hideToast() {
        this.setState({isToastVisisble: false});
    },

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
					<ContactButton action={this.contactOwner}/>
				</View>
                <Toast isVisible={this.state.isToastVisisble}>
                    <TouchableOpacity onPress={this.hideToast}>
                        <Text style={styles.toastText}>
                            Message Sent!
                        </Text>
                    </TouchableOpacity>
                </Toast>
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
    },

    contactOwner() {
        this.props.navigator.push({
            title: 'Contact',
            component: require('./Contact'),
            passProps: {
                owner: this.props.listing.owner,
                action: this.contacted,
            },
        });
    },

    contacted() {
        this.props.navigator.pop();
        this.setState({isToastVisisble: true});
    },
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

    toastText: {
      color: '#ffffff',
      padding: 15,
      backgroundColor: 'transparent',
      fontSize: 14,
    },
});

module.exports = Listing;
