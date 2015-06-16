'use strict';

var React = require('react-native'),
	Api = require('../core/Api'),
	Colors = require('../core/Colors'),
	Card = require('./Card');

var {
	StyleSheet,
	View,
	ScrollView,
} = React;

var styles = StyleSheet.create({
	list: {
		backgroundColor: Colors.black,
		top: -20,
	},

	container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	},
});


var CardsList = React.createClass({
	render() {
		var categories = Api.categories;
		var Cards = categories.map((category, i) => <Card key={i} type={category} />);

		return (
			<ScrollView style={styles.list}>
			  <View style={styles.container}>
			  	{Cards}
			  </View>
			</ScrollView>
		);
	}
});

module.exports = CardsList;