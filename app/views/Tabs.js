'use strict';

var React = require('react-native'),
	SMXTabBarIOS = require('SMXTabBarIOS'),
	SMXTabBarItemIOS = SMXTabBarIOS.Item,
	Colors = require('../core/Colors'),
	Home = require('./Home'),
	New = require('./New'),
	User = require('./User');

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
	getInitialState() {
		return {
			activeTab: 'home',
		};
	},

	render() {
		var tabs = [
			this.renderTab('home', 'ion|ios-home-outline', <Home {...this.props} />),
			this.renderTab('new', 'ion|plus', <New {...this.props} />),
			this.renderTab('user', 'ion|person', <User {...this.props} />),
		];

		return (
			<SMXTabBarIOS
			activeTab={this.state.activeTab}
			tintColor={Colors.brandSecondary}
			translucent={true}
			barTintColor="transparent">
				{tabs}
			</SMXTabBarIOS>
		);
	},

	renderTab(name, icon, view) {
		return (
			<SMXTabBarItemIOS
			name={name}
			iconName={icon}
			iconSize={32}
			title={''}
			key={name}
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
