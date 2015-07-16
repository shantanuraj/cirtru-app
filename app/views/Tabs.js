'use strict';

var React = require('react-native'),
	Colors = require('../core/Colors'),
	Home = require('./Home'),
	New = require('./New'),
	Profile = require('./Profile');

var { TabBarIOS } = require('react-native-icons');
var	TabBarItemIOS = TabBarIOS.Item;

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
			<TabBarItemIOS
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
			</TabBarItemIOS>
		);
	},

	render() {
		var tabs = [
			this.renderTab('home', 'ion|ios-home-outline', <Home {...this.props} />),
			this.renderTab('profile', 'ion|person', <Profile {...this.props} />),
			// this.renderTab('search', 'ion|ios-search-strong', <Search {...this.props} />),
			// this.renderTab('new', 'ion|plus', <New {...this.props} />),
		];

		return (
			<TabBarIOS
			activeTab={this.state.activeTab}
			barTintColor="transparent"
			tintColor={Colors.brandSecondary}
			translucent={true}>
				{tabs}
			</TabBarIOS>
		);
	},
});

module.exports = Tabs;
