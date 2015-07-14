'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window'),
    _ = require('immutable');

var {
    StyleSheet,
    View,
    Text,
    Image,
} = React;

var styles = StyleSheet.create({
    container: {
        paddingLeft: 16,
        paddingRight: 16,
        width: window.width,
    },
    subContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
    },
    leadText: {
        fontSize: 20,
    },
    subText: {
        fontSize: 16,
    },
});

var titles = {
    pool: 'Pool',
    parking: 'Parking',
    laundry: 'Laundry',
    gym: 'Gym',
    ac: 'AC',
    tv: 'Televison',
    security: 'Gated security',
    heating: 'Heating',
    elevator: 'Elevator',
    internet: 'Internet',
};

var Amenities = React.createClass({
    render() {
        var amenities = _.Map(titles).filter((v, k) => this.props.amenities[k]);
        if (amenities.size === 0) {
            return (
                <View />
            );
        }
        return (
            <View style={styles.container}>
                <Text style={styles.leadText}>Property Amenities</Text>
                <View style={styles.subContainer}>
                    <Text style={styles.subText}>{amenities.valueSeq().join(', ')}</Text>
                </View>
            </View>
        );
    },
});

module.exports = Amenities;
