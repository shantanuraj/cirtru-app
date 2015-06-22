'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window'),
    RoomInfo = require('./RoomInfo');

var {
    StyleSheet,
    View,
    Text,
} = React;

var Rooms = React.createClass({
    render() {
        var rooms = this.props.rooms.filter(room => room.roomOccupancy.length != 0);
        return (
            <View style={styles.wrapper}>
                {rooms.map((room, i) => <RoomInfo {...this.props} key={i} room={room} style={styles.container}/>)}
            </View>
        );
    }
});

var styles = StyleSheet.create({
    wrapper: {
        width: window.width,
        height: 400,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

module.exports = Rooms;
