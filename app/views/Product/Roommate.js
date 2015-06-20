'use strict';

var React = require('react-native'),
    Images = require('../util/Images'),
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
            images  = listing.images.pics;
        return (
            <ScrollView style={styles.container}>
                <Images images={images} style={styles.images} />
                <Text>
                    Roommate
                </Text>
            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({
    images: {
        height: 300,
        width: window.width,
    },
});

module.exports = Roommate;
