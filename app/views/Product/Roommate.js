'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    Images = require('../util/Images'),
    Price = require('../util/Price'),
    Info = require('../util/Info'),
    ContactButton = require('../util/ContactButton'),
    window = require('Dimensions').get('window');

var {
    Text,
    View,
    StyleSheet,
    ScrollView,
} = React;

var Roommate = React.createClass({
    render() {
        var listing = this.props.listing,
            images  = listing.images.pics,
            price   = listing.cost,
            info    = listing.description;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <Images images={images} style={styles.images} />
                    <Price price={price} />
                    <Info description={info}/>
                </ScrollView>
				<View style={styles.fabContainer}>
					<ContactButton />
				</View>
			</View>
        );
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

module.exports = Roommate;
