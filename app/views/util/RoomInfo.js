'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window');

var {
    Text,
    View,
    StyleSheet
} = React;

var RoomInfo = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundGrey,
        width: window.width,
    },
});

module.exports = RoomInfo;
