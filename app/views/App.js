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

var App = React.createClass({
	render: function() {
		return (
			<NavigatorIOS
			barTintColor="#222"
			tintColor={Colors.white}
			titleTextColor={Colors.white}
			style={styles.container}
			initialRoute={{
				title: 'Cirtru',
				component: Tabs,
			}} />
		);
	},

});

module.exports = App;