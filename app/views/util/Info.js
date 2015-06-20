'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window');

var {
    StyleSheet,
    View,
    Text,
} = React;

var Info = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.info}>
                    {this.props.description}
                </Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.grey,
        width: window.width,
    },
    info: {
        color: Colors.white,
        padding: 12,
        fontSize: 16,
    }
});

module.exports = Info;
