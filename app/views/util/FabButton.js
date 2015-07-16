'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors');

var { Icon } = require('react-native-icons');
var {
    StyleSheet,
    TouchableHighlight,
} = React;

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
        shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
});

var FabButton = React.createClass({
    render() {
        return (
            <TouchableHighlight
            onPress={this.props.action}
            style={styles.fab}
            underlayColor={Colors.brandSecondary}>
                <Icon
                name={this.props.icon}
                size={32}
                color={Colors.white}
                style={styles.icon} />
            </TouchableHighlight>
        );
    }
});

module.exports = FabButton;
