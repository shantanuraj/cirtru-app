'use strict';

var React = require('react-native'),
    Icon = require('FAKIconImage'),
    Colors = require('../../core/Colors');

var {
    StyleSheet,
    TouchableHighlight,
    Text,
} = React;

var ContactButton = React.createClass({
    render() {
        return (
            <TouchableHighlight
            onPress={this.props.action}
            style={styles.fab}
            underlayColor={Colors.brandSecondary}>
                <Icon
                name='fontawesome|filter'
                size={28}
                color={Colors.white}
                style={styles.icon} />
            </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32,
    },

    fab: {
        backgroundColor: Colors.brandSecondaryDark,
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
});

module.exports = ContactButton;
