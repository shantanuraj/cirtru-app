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
        color: Colors.grey,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 8,
    },
    title: {
        color: Colors.black,
        fontSize: 20,
    },
    value: {
        color: Colors.grey,
        fontSize: 20,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    }, 
});

var Occupancy = React.createClass({
    renderRow(title, value) {
        return (
            <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        );
    },

    render() {
    	var occupancy = this.props.occupancy;
        return (
            <View style={styles.occupancy}>
            	<Text style={styles.subText}>Looking for</Text>
                {this.renderRow('Occupant', occupancy.occupant)}
                {this.renderRow('Occupation', occupancy.occupation)}
                {this.renderRow('Gender', occupancy.gender)}
                {this.renderRow('Age', occupancy.age)}
                {this.renderRow('Deposit', '$' + occupancy.deposit)}
                {this.renderRow('Diet', occupancy.diet)}
                {this.renderRow('Smoking', occupancy.smoking)}
                {this.renderRow('Drinking', occupancy.drinking)}
                {this.renderRow('Pets', occupancy.pets)}
                {this.renderRow('Start', occupancy.from)}
                {this.renderRow('Minimum stay', occupancy.minStay)}
            </View>
        );
    },
});

module.exports = Occupancy;
