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
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    }, 
});

var Occupancy = React.createClass({
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
	    			{'Deposit: $' + occupancy.deposit + ', '}
	    			{'Rent: $' + occupancy.rent + ', '}
	    			{'Available from: ' + occupancy.from + ', '}
	    			{'Min Stay: ' + occupancy.minStay}
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
