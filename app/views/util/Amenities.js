'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors');

var {
    StyleSheet,
    ScrollView,
    View,
    Text,
} = React;

var Icons = {
    pool: requrire('image!swim'),
    parking: requrire('image!parking'),
    laundry: requrire('image!tshirt'),
    // gym: requrire('image!'),
    ac: requrire('image!fan'),
    tv: requrire('image!television'),
    security: requrire('image!security'),
    heating: requrire('image!thermometer'),
    // elevator: requrire('image!'),
    internet: requrire('image!wifi'),
}

var Amenities = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Amenities box
                </Text>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
    },
});

module.exports = Amenities;
