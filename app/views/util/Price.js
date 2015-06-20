'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors');

var {
    StyleSheet,
    View,
    Text,
} = React;

var Price = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.price}>
                    ${this.props.price}
                </Text>
            </View>
        );
    }
 });

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: "transparent",
        top: 260,
        left: 8,
    },
    price: {
        fontSize: 32,
        fontWeight: '900',
        color: Colors.white,
    },
});

module.exports = Price;
