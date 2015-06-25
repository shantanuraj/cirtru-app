'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window'),
    _ = require('immutable');

var {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
} = React;

var icons = {
    pool: require('image!pool'),
    parking: require('image!parking'),
    laundry: require('image!laundry'),
    gym: require('image!gym'),
    ac: require('image!ac'),
    tv: require('image!tv'),
    security: require('image!security'),
    heating: require('image!heating'),
    elevator: require('image!elevator'),
    internet: require('image!internet'),
};

var Amenities = React.createClass({
    getInitialState() {
        var list = _.Map(icons).filter((v, k) => this.props.amenities[k] === true);
        return {
            icons: list.toArray()
        };
    },

    render() {
        if (this.state.icons.length === 0) {
            return (
                <View />
            );
        }
        return (
            <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.container}
            horizontal={true}
            contentInset={{top: -65}}>
                <View style={styles.leadText}>
                    <Text style={styles.text}>Amenities: </Text>
                </View>
                {this.state.icons.map((icon, i) => <Image key={i} style={styles.icon} source={icon} />)}
            </ScrollView>
        );
    },
});

var styles = StyleSheet.create({
    scroll: {
        backgroundColor: Colors.backgroundLight,
        width: window.width,
        padding: 2,
    },
    container: {
        justifyContent: 'space-between',
    },
    leadText: {
        padding: 12,
    },
    text: {
        fontSize: 18,
    },
    icon: {
        width: 36,
        height: 36,
    }
});

module.exports = Amenities;
