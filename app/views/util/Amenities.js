'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors');

var {
    StyleSheet,
    ScrollView,
    View,
    Text,
} = React;

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
