'use strict';

var React = require('react-native'),
    Overlay = require('react-native-overlay'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window');

var {
    View,
    StyleSheet,
} = React;

var Toast = React.createClass({
    render() {
        var inferedStyle = {
            backgroundColor: Colors[this.props.mode]
        }
        return (
            <Overlay isVisible={this.props.isVisible}>
                <View style={[styles.top, inferedStyle]}>
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
        width: window.width,
        alignItems: 'center',
    },

    content: {
        flex: 9,
    },
});

module.exports = Toast;
