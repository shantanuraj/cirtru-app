'use strict';

var React = require('react-native'),
	Api = require('../core/Api'),
	Colors = require('../core/Colors'),
	MiniCard = require('./MiniCard');

var {
	StyleSheet,
	View,
	ScrollView,
} = React;

var styles = StyleSheet.create({
	list: {
		backgroundColor: Colors.black,
	},

	container: {
	    flex: 1,
	    marginTop:40,
	    justifyContent: 'center',
	    alignItems: 'center',
	},
});


var New = React.createClass({
	render: function() {
		var categories = Api.categories;
		var Cards = categories.map((category, i) => <MiniCard {...this.props} key={i} type={category} />);

		return (
			<ScrollView style={styles.list}>
			  <View style={styles.container}>
			  	{Cards}
			  </View>
			</ScrollView>
		);
	},
});

module.exports = New;