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
	container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: Colors.background,
	},
});


var Home = React.createClass({
	render() {
		var categories = Api.categories;
		var Cards = categories.map(category => <Card type={category} />);

		return (
			<ScrollView>
			  <View style={styles.container}>
			  	{Cards}
			  </View>
			</ScrollView>
		);
	}
});

module.exports = Home;