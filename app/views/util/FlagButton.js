'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors');

var window = require('Dimensions').get('window');

var {
    StyleSheet,
    TouchableHighlight,
    Text,
} = React;

var styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.brandSecondaryDark,
        justifyContent: 'center',
        alignItems: 'center',
        width: window.width,
        shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
    buttonText: {
        padding: 8,
        color: Colors.white,
        alignItems: 'center',
        fontSize: 22,
    },
});

var FlagButton = React.createClass({
    render() {
        return (
            <TouchableHighlight
            onPress={this.props.action}
            style={styles.button}
            underlayColor={Colors.brandSecondary}>
                <Text style={styles.buttonText}>Report</Text>
            </TouchableHighlight>
        );
    }
});

module.exports = FlagButton;
