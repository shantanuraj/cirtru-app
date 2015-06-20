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
            <ScrollView style={styles.container}>
                <View>
                    <Images images={images} style={styles.images} />
                    <Price price={price} />
                    <Info description={info}/>
                </View>
                <ContactButton />
            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.grey,
    },
    images: {
        height: 300,
        width: window.width,
    },
});

module.exports = Roommate;
