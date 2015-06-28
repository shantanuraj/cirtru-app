'use strict';

var React = require('react-native'),
	Colors = require('../core/Colors'),
	Tabs = require('./Tabs');

var {
	StyleSheet,
	Text,
	View,
	NavigatorIOS,
	PushNotificationIOS,
} = React;

var App = React.createClass({
	componentWillMount() {
		PushNotificationIOS.addEventListener('notification', this.onNotification);
	},

	componentWillUnmount() {
		PushNotificationIOS.removeEventListener('notification', this.onNotification);
	},

	render() {
		return (
			<NavigatorIOS
			barTintColor={Colors.brandSecondaryLight}
			tintColor={Colors.white}
			titleTextColor={Colors.white}
			style={styles.container}
			initialRoute={{
				title: 'Cirtru',
				component: Tabs,
			}} />
		);
	},

	onNotification(notification) {
		AlertIOS.alert(
			'Notification Received',
			notification.getMessage(),
			[{
				text: 'Dismiss',
				onPress: this.clearBadge,
			}]
		);
	},

	clearBadge() {
		PushNotificationIOS.setApplicationBadgeNumber(0);
	},
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

module.exports = App;
