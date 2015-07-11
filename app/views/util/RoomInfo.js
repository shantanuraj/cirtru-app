'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    Occupancy = require('./Occupancy');

var window = require('Dimensions').get('window');

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
        backgroundColor: Colors.white,
        padding: 16,
    },
    leadText: {
        color: Colors.black,
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

var RoomInfo = React.createClass({
    renderTitle(type) {
        var index = this.props.i + 1;
        var suffix = this.props.total == 1 ? '' : ' ' + index;
        return (
            <Text style={styles.leadText}>{type + suffix}</Text>
        );
    },

    render() {
        var room = this.props.room,
            type = room.roomType,
            occupancies = room.roomOccupancy;

        return (
            <View style={styles.container}>
                {this.renderTitle(type)}
                {occupancies.map((occupancy, i) => <Occupancy key={i} occupancy={occupancy} />)}
            </View>
        );
    },
});

module.exports = RoomInfo;
