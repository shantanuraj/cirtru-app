'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window');

var {
    StyleSheet,
    View,
    Text,
} = React;

var styles = StyleSheet.create({
    container: {
        width: window.width,
        backgroundColor: Colors.white,
        padding: 16,
    },

    leadText: {
        fontSize: 20,
    },

    subText: {
        marginTop: 8,
        fontSize: 16,
        paddingLeft: 16,
        paddingRight: 16,
    },
});

var Info = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.leadText}>
                    Description
                </Text>
                <Text style={styles.subText}>
                    {this.props.description}
                </Text>
            </View>
        );
    }
});

module.exports = Info;
