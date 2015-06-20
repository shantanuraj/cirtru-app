'use strict';

var React = require('react-native');

var {
    Text,
    View,
    StyleSheet,
} = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

var Roommate = React.createClass({
    render() {
        console.log(this.props.listing);
        return (
            <View style={styles.container}>
                <Text>
                    Roommate
                </Text>
            </View>
        );
    }
});

module.exports = Roommate;
