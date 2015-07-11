'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window');

var {
    StyleSheet,
    Text,
    View,
} = React;

var LocationBox = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {this.props.location}
                </Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        padding: 16,
        width: window.width,
        backgroundColor: Colors.brandSecondary,
    },
    text: {
        color: Colors.white,
        fontSize: 18,
    }
});

module.exports = LocationBox;
