'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window'),
    RoomInfo = require('./RoomInfo');

var {
    StyleSheet,
    ScrollView,
    Text,
} = React;

var Rooms = React.createClass({
    bedsAndBaths() {
        var beds  = this.props.data.beds,
            baths = this.props.data.baths,
            bedMessage = 'bed',
            bathMessage = 'bath';

        if (beds > 1) {
            bedMessage += 's';
        }
        if (baths > 1) {
            bathMessage += 's';
        }
        return beds + ' ' + bedMessage + ' & ' + baths + ' ' + bathMessage;
    },

    render() {
        var rooms = this.props.data.rooms.filter(room => room.roomOccupancy.length > 0),
            length = rooms.length;
        return (
            <ScrollView style={styles.wrapper} contentInset={{top: -65}}>
                <Text key={1338} style={styles.leadText}>Property has {this.bedsAndBaths()}</Text>
                {rooms.map((room, i) => <RoomInfo {...this.props} total={length} i={i} key={i} room={room} style={styles.container} />)}
            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({
    wrapper: {
        paddingTop: 8,
        width: window.width,
        backgroundColor: Colors.white,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leadText: {
        color: Colors.black,
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

module.exports = Rooms;
