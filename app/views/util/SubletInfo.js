'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors');

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
        backgroundColor: Colors.white,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
    },

    leadText: {
        paddingTop: 16,
        fontSize: 20,
    },

    boldText: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 16,
        paddingRight: 16,
    },

    subText: {
        marginTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        fontSize: 16,
    },
});

var SubletInfo = React.createClass({
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
    },

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

        var values = [
            'Deposit ' + deposit,
            'Diet ' + sublet.diet,
            'Start ' + sublet.start,
            'End ' + sublet.end ? sublet.end : '-',
        ];

        return (
            <View style={styles.container}>
                <Text style={styles.leadText}>Type</Text>
                <Text style={styles.subText}>{type}</Text>

                <Text style={styles.leadText}>Property has</Text>
                <Text style={styles.subText}>{this.bedsAndBaths(sublet.beds, sublet.baths)}</Text>
                <Text style={styles.boldText}>{values.join(', ')}</Text>
            </View>
        );
    },
});

module.exports = SubletInfo;
