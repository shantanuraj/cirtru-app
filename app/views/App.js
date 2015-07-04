'use strict';

var React = require('react-native'),
	Colors = require('../core/Colors'),
	Tabs = require('./Tabs'),
	FilterActions = require('../actions/FilterActions');

var {
	StyleSheet,
	Text,
	View,
	AlertIOS,
	NavigatorIOS,
	PushNotificationIOS,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

var App = React.createClass({
	componentWillMount() {
		PushNotificationIOS.addEventListener('notification', this.onNotification);
		FilterActions.getOptions();
	},

	componentWillUnmount() {
		PushNotificationIOS.removeEventListener('notification', this.onNotification);
	},

	onNotification(notification) {
		AlertIOS.alert(
			'Notification Received',
			notification.getMessage(),
			[
				{
					text: 'Dismiss',
					onPress: this.clearBadge,
				},
			],
		);
	},

	clearBadge() {
		PushNotificationIOS.setApplicationBadgeNumber(0);
	},

	render() {
		return (
			<NavigatorIOS
			barTintColor={Colors.brandSecondaryLight}
			initialRoute={{
				title: 'Cirtru',
				component: Tabs,
			}}
			style={styles.container}
			tintColor={Colors.white}
			titleTextColor={Colors.white} />
		);
	},
});

module.exports = App;
