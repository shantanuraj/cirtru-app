'use strict';

var React = require('react-native'),
	Api = require('../core/Api'),
	Colors = require('../core/Colors'),
	MiniCard = require('./MiniCard');

var window = require('Dimensions').get('window');

var {
	StyleSheet,
	View,
	Text,
} = React;

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

var New = React.createClass({
	openCreatePage(category) {
		var self = this;
		return function () {
			var page;
			switch(category) {
				// case 'Roommates': page = require('./create/CreateRoommate'); break;
				// case 'Sublets' : page = require('./create/CreateSublet'); break;
				// case 'Cars': page = require('./create/CreateCar'); break;
				default: page = require('./create/CreateOther'); break;
			}
			console.log(category);
			self.props.navigator.push({
				title: 'New listing',
				component: page,
			});
		};
	},

	renderGroup(card1, card2) {
		return (
			<View style={styles.grid}>
				{card1}
				{card2}
			</View>
		);
	},

	render() {
		var categories = Api.categories,
			category = categories[0];

		categories = categories.slice([1]);
		var Cards = categories.map((category, i) => <MiniCard {...this.props} key={i} type={category} dimen={window.width / 2} action={this.openCreatePage(category)} />);

		return (
			<View style={styles.container}>
				<MiniCard {...this.props} key={192} type={category} dimen={window.width} action={this.openCreatePage(category)} />
				{this.renderGroup(Cards[0], Cards[1])}
				{this.renderGroup(Cards[2], Cards[3])}
			</View>
		);
	},
});

module.exports = New;
