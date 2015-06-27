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
		PushNotificationIOS.addEventListener('notification', this._onNotification);
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

	_onNotification(notification) {
		AlertIOS.alert(
			'Notification Received',
			notification.getMessage(),
			[{
				text: 'Dismiss',
				onPress: null,
			}]
		);
	},
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

module.exports = App;
