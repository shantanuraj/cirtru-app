'use strict';

var React = require('react-native'),
	SMXTabBarIOS = require('SMXTabBarIOS'),
	SMXTabBarItemIOS = SMXTabBarIOS.Item,
	Colors = require('../core/Colors'),
	Listings = require('./Listings'),
	CardsList = require('./CardsList');

var {
	StyleSheet,
	Text,
	View,
	NavigatorIOS,
} = React;

var styles = StyleSheet.create({
	tabBar : {
		flex: 1,
	}
});

var Tabs = React.createClass({
	getInitialState: function() {
		return {
			activeTab: 'home',
		};
	},

	render: function() {
		var tabs = [
			this.renderTab('home', 'ion|ios-home-outline', <CardsList {...this.props} />),
			this.renderTab('new', 'ion|plus', <Listings />),
			this.renderTab('user', 'ion|person', <Listings />),
		];

		return (
			<SMXTabBarIOS
			activeTab={this.state.activeTab}
			tintColor={Colors.brandSecondary}
			barTintColor="transparent"
			>
				{tabs}
			</SMXTabBarIOS>
		);
	},

	renderTab: function(name, icon, view) {
		return (
			<SMXTabBarItemIOS
			name={name}
			iconName={icon}
			iconSize={32}
			title={''}
			selected={this.state.activeTab === name}
			onPress={
				() => {
					this.setState({
						activeTab: name
					});
				}
			}>
			  {view}
			</SMXTabBarItemIOS>
		);
	},
});

module.exports = Tabs;