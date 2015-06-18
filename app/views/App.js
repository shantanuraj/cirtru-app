'use strict';

var React = require('react-native'),
	Colors = require('../core/Colors'),
	Tabs = require('./Tabs');

var {
	StyleSheet,
	Text,
	View,
	NavigatorIOS,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

class App extends React.Component {
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
	}
}

module.exports = App;
