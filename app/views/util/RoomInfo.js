'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window');

var {
    Text,
    View,
    StyleSheet
} = React;

var RoomInfo = React.createClass({
    render() {
        var room = this.props.room,
            type = room.roomType,
            occupancy = room.roomOccupancy[0];

        return (
            <View style={styles.container}>
                <Text style={styles.leadText}>{type}</Text>
                <Text style={styles.subText}>{this.bedsAndBaths()}</Text>
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

    renderRow(title, value) {
        return (
            <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        );
    },

    bedsAndBaths() {
        var beds  = this.props.beds,
            baths = this.props.baths,
            bedMessage = 'bed',
            bathMessage = 'bath';

        if (beds > 1) {
            bedMessage += 's';
        }
        if (baths > 1) {
            bathMessage += 's';
        }

        return beds + " " + bedMessage + " & " + baths + " " + bathMessage;
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        width: window.width,
        height: 400,
        justifyContent: 'center',
        backgroundColor: Colors.backgroundGrey,
        padding: 12,
    },
    leadText: {
        color: Colors.grey,
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    subText: {
        color: Colors.grey,
        alignSelf: 'center',
        fontSize: 20,
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

module.exports = RoomInfo;
