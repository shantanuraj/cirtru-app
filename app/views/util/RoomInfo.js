'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window');

var {
    Text,
    View,
    StyleSheet
} = React;


var styles = StyleSheet.create({
    container: {
        flex: 1,
        width: window.width,
        justifyContent: 'center',
        backgroundColor: Colors.backgroundLight,
        padding: 12,
    },
    leadText: {
        color: Colors.grey,
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
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
    }
});

var RoomInfo = React.createClass({
    renderTitle(type) {
        var index = this.props.i + 1;
        var suffix = this.props.total == 1 ? '' : ' ' + index;
        return (
            <Text style={styles.leadText}>{type + suffix}</Text>
        );
    },

    renderRow(title, value) {
        return (
            <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        );
    },

    render() {
        var room = this.props.room,
            type = room.roomType,
            occupancy = room.roomOccupancy[0];

        return (
            <View style={styles.container}>
                {this.renderTitle(type)}
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

module.exports = RoomInfo;
