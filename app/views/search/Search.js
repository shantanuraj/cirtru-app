'use strict';

var React = require('react-native'),
	Api = require('../../core/Api'),
	Colors = require('../../core/Colors');

var {
	StyleSheet,
	View,
	Text
} = React;

var styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.grey,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

var Search = React.createClass({
	render() {
		return (
			<View style={styles.container}>
				<Text>
					Hello
				</Text>
			</View>
		);
	},
});

module.exports = Search;
