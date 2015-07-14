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
        marginTop: 8,
        marginBottom: 8,
    },
    subText: {
        color: Colors.black,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 8,
    },
    title: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        color: Colors.black,
        fontSize: 16,
    },
});

var Occupancy = React.createClass({
    renderOptionally(title, value) {
        if (value !== null && value !== '') {
            return title + value + ', ';
        }
    },

    renderDetails() {
        var occupancy = this.props.occupancy;
        return (
            <View>
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
                <Text style={styles.title}>
                    {this.renderOptionally('Deposit: $', occupancy.deposit)}
                    {this.renderOptionally('Rent: $', occupancy.rent)}
                    {this.renderOptionally('Available from: ', occupancy.from)}
                    {this.renderOptionally('Min Stay: ', occupancy.minStay)}
                </Text>
            </View>
        );
    },

    render() {
        return (
            <View style={styles.occupancy}>
                <Text style={styles.subText}>Looking for</Text>
                {this.renderDetails()}
            </View>
        );
    },
});

module.exports = Occupancy;
