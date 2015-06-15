/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native'),
	Router = require('react-native-router'),
	Colors = require('./app/core/Colors'),
	MenuButton = require('./app/views/MenuButton'),
	ProductList = require('./app/views/ProductList');

var {
	AppRegistry,
	View,
	StyleSheet,
} = React;

var styles = StyleSheet.create({
	navbar: {
		backgroundColor: Colors.brandPrimary,
	},
});

var firstRoute = {
	name: 'Cirtru',
	component: ProductList,
	leftCorner: MenuButton,
};

var App = React.createClass({
	render() {
		return (
			<Router
				headerStyle={styles.navbar}
				firstRoute={firstRoute}
			/>			
		);
	}
});

AppRegistry.registerComponent('Trios', () => App);
