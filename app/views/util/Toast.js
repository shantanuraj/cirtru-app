'use strict';

var React = require('react-native'),
    Overlay = require('react-native-overlay'),
    Colors = require('../../core/Colors');

var {
    View,
    StyleSheet,
} = React;

var Toast = React.createClass({
    render() {
        return (
            <Overlay isVisible={this.props.isVisible}>
                <View style={styles.top}>
                    <View style={styles.content}>
                        {this.props.children}
                    </View>
                </View>
            </Overlay>
        );
    },
});

//Styles from https://github.com/brentvatne/react-native-overlay/blob/master/Examples/Toast/Toast.ios.js
var styles = StyleSheet.create({
    top: {
        paddingTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.brandPrimary,
    },

    content: {
        flex: 9,
    },
});

module.exports = Toast;
