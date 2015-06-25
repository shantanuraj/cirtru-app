'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors');

var {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} = React;

var CreateOther = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <Text>Post to Cirtru</Text>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

module.exports = CreateOther;
