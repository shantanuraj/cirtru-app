'use strict';

var React = require('react-native'),
	SMXTabBarIOS = require('SMXTabBarIOS'),
	Colors = require('../core/Colors'),
	Home = require('./Home'),
	New = require('./New'),
	Search = require('./search/Search'),
	Profile = require('./Profile');

var	SMXTabBarItemIOS = SMXTabBarIOS.Item;

var {
	StyleSheet,
	Text,
	View,
	NavigatorIOS,
} = React;

var Tabs = React.createClass({
	getInitialState() {
		return {
			activeTab: 'home',
		};
	},

	renderTab(name, icon, view) {
		return (
			<SMXTabBarItemIOS
			iconName={icon}
			iconSize={32}
			key={name}
			name={name}
			onPress={
				() => {
					this.setState({
						activeTab: name,
					});
				}
			}
			selected={this.state.activeTab === name}
			title={''}>
				{view}
			</SMXTabBarItemIOS>
		);
	},

	render() {
		var tabs = [
			this.renderTab('search', 'ion|ios-search-strong', <Search {...this.props} />),
			this.renderTab('home', 'ion|ios-home-outline', <Home {...this.props} />),
			// this.renderTab('new', 'ion|plus', <New {...this.props} />),
			this.renderTab('profile', 'ion|person', <Profile {...this.props} />),
		];

		return (
			<SMXTabBarIOS
			activeTab={this.state.activeTab}
			barTintColor="transparent"
			tintColor={Colors.brandSecondary}
			translucent={true}>
				{tabs}
			</SMXTabBarIOS>
		);
	},
});

module.exports = Tabs;
