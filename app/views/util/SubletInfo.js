'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window');

var {
    Text,
    View,
    StyleSheet
} = React;

var SubletInfo = React.createClass({
    render() {
        String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }

        var sublet = this.props.sublet,
            type = sublet.type,
            deposit = sublet.deposit;
            sublet.diet = sublet.diet.capitalize();

        if (!deposit || deposit === 0) {
            deposit = 'None';
        } else {
            deposit = '$' + deposit;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.leadText}>{type}</Text>
                <Text style={styles.subText}>{this.bedsAndBaths(sublet.beds, sublet.baths)}</Text>
                {this.renderRow('Deposit', deposit)}
                {this.renderRow('Diet', sublet.diet)}
                {this.renderRow('Pets', sublet.pets)}
                {this.renderRow('Start', sublet.start)}
                {this.renderRow('End', sublet.end)}
            </View>
        );
    },

    renderRow(title, value) {
        if (!value) {
            return;
        }
        return (
            <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        );
    },

    bedsAndBaths(beds, baths) {
        var bedMessage = 'bed',
            bathMessage = 'bath',
            sep = ' & ';

        if (beds === undefined) {
            beds = bedMessage = sep = ''
        }
        if (baths === undefined) {
            baths = bathMessage = sep = ''
        }

        if (beds > 1) {
            bedMessage += 's';
        }
        if (baths > 1) {
            bathMessage += 's';
        }

        return beds + ' ' + bedMessage + sep + baths + ' ' + bathMessage;
    }
});

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

module.exports = SubletInfo;
