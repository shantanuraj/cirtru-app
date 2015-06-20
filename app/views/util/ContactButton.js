'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors');

var {
    StyleSheet,
    TouchableHighlight,
    Text,
} = React;

var ContactButton = React.createClass({
    render() {
        return (
            <TouchableHighlight style={styles.button}>
                <Text style={styles.text}>
                    Contact
                </Text>
            </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    button: {
        width: window.width - 20,
        padding: 8,
        height: 36,
        backgroundColor: Colors.white,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.brandSecondaryDark,
        fontWeight: '300',
        fontSize: 28,
    }
});

module.exports = ContactButton;
