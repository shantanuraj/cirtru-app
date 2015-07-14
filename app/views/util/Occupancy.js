'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors');

var {
    Text,
    View,
    StyleSheet
} = React;

var styles = StyleSheet.create({
    occupancy: {
        marginTop: 16,
        paddingLeft: 16,
    },
    subText: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: 'bold',
    },
    details: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        color: Colors.black,
        fontSize: 16,
    },
    info: {
        marginTop: 16,
    }
});

var Occupancy = React.createClass({
    renderOptionally(title, value) {
        if (value !== null && value !== '') {
            return title + value + ', ';
        }
    },

    renderIfOccupancy(occupancy) {
        if (occupancy.roommateStatus === 'Looking') {
            return (
                <Text style={styles.details}>
                    {this.renderOptionally('Deposit: $', occupancy.deposit)}
                    {this.renderOptionally('Rent: $', occupancy.rent)}
                    {this.renderOptionally('Available from: ', occupancy.from)}
                    {this.renderOptionally('Min Stay: ', occupancy.minStay)}
                </Text>
            );
        }
    },

    renderDetails() {
        var occupancy = this.props.occupancy;
        return (
            <View style={styles.info}>
                <Text style={styles.value}>
                    {occupancy.occupant + ', '}
                    {occupancy.occupation + ', '}
                    {occupancy.gender + ' gender, '}
                    {occupancy.age + ' years old, '}
                    {occupancy.pets + ', '}
                    {occupancy.smoking + ', '}
                    {occupancy.drinking + ', '}
                    {occupancy.diet + ' \n'}
                </Text>
                {this.renderIfOccupancy(occupancy)}
            </View>
        );
    },

    getTitle() {
        if (this.props.occupancy.roommateStatus === 'Looking') {
            return 'Looking for';
        } else {
            return 'Occupied by';
        }
    },

    render() {
        return (
            <View style={styles.occupancy}>
                <Text style={styles.subText}>{this.getTitle()}</Text>
                {this.renderDetails()}
            </View>
        );
    },
});

module.exports = Occupancy;
