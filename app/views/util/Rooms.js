'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    Amenities = require('./Amenities'),
    RoomInfo = require('./RoomInfo');

var window = require('Dimensions').get('window');

var {
    StyleSheet,
    ScrollView,
    Text,
} = React;

var styles = StyleSheet.create({
    wrapper: {
        paddingTop: 16,
        width: window.width,
        backgroundColor: Colors.white,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leadText: {
        paddingLeft: 16,
        fontSize: 20,
    },

    subText: {
        paddingLeft: 32,
        fontSize: 16,
        marginTop: 8,
    },
});

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
        return beds + ' ' + bedMessage + ', ' + baths + ' ' + bathMessage;
    },

    render() {
        var rooms = this.props.data.rooms.filter(room => room.roomOccupancy.length > 0),
            length = rooms.length;
        return (
            <ScrollView style={styles.wrapper} contentInset={{top: -65}}>
                <Text key={1337} style={styles.leadText}>Property has</Text>
                <Text key={1338} style={styles.subText}>{this.bedsAndBaths()}</Text>
                {rooms.map((room, i) => <RoomInfo {...this.props} total={length} i={i} key={i} room={room} style={styles.container} />)}
                <Amenities amenities={this.props.data.amenities} />
            </ScrollView>
        );
    }
});

module.exports = Rooms;
