'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors');

var {
    StyleSheet,
    Text,
    View
} = React;

var Circle = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.circle}>
                    {this.props.circle}
                </Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: "transparent",
        top: 270,
        right: 8,
    },
    circle: {
        fontSize: 20,
        fontWeight: '300',
        color: Colors.white,
    },
});

module.exports = Circle;
