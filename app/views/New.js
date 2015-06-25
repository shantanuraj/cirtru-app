'use strict';

var React = require('react-native'),
	Api = require('../core/Api'),
	Colors = require('../core/Colors'),
	MiniCard = require('./MiniCard'),
	window = require('Dimensions').get('window');

var {
	StyleSheet,
	View,
	Text,
} = React;

var New = React.createClass({
	render() {
		var categories = Api.categories,
			category = categories[0],
			categories = categories.slice([1]),
			Cards = categories.map((category, i) => <MiniCard {...this.props} key={i} type={category} width={window.width / 2} height={window.width / 2} />);

		return (
			<View style={styles.container}>
				<MiniCard {...this.props} key={192} type={category} width={window.width} height={window.width / 2} />
				{this.renderGroup(Cards[0], Cards[1])}
				{this.renderGroup(Cards[2], Cards[3])}
			</View>
		);
	},

	renderGroup(card1, card2) {
		return (
			<View style={styles.grid}>
				{card1}
				{card2}
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
		backgroundColor: Colors.grey,
	},

	leadText: {
		fontSize: 32,
		fontWeight: 'bold',
		color: Colors.white,
		padding: 16,
	},

	grid: {
		flexDirection: 'row',
    	alignItems: 'center',
    	justifyContent: 'center',
	},
});

module.exports = New;
