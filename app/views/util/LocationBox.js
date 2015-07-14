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
                <Text style={styles.leadText}>
                    Location
                </Text>
                <Text style={styles.text}>
                    {this.props.location}
                </Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        width: window.width,
        backgroundColor: Colors.white,
    },

    leadText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    text: {
        paddingLeft: 16,
        marginTop: 8,
        fontSize: 16,
    }
});

module.exports = LocationBox;
