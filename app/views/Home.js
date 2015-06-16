var React = require('react-native'),
	Api = require('../core/Api'),
	Colors = require('../core/Colors'),
	Card = require('./Card'),
	Icon = require('FAKIconImage');

var {
	StyleSheet,
	View,
	ScrollView,
} = React;

var styles = StyleSheet.create({
	list: {
		backgroundColor: "black",
	},

	container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: Colors.black,
	},
});


var Home = React.createClass({
	render() {
		var categories = Api.categories;
		var Cards = categories.map(category => <Card type={category} />);

		return (
			<ScrollView style={styles.list}>
			  <View style={styles.container}>			  	
			  	{Cards}
			  </View>
			</ScrollView>
		);
	}
});

module.exports = Home;