'use strict';

let React = require('react-native');

let {
	StyleSheet,
	ListView,
	Text,
	View,
} = React;

let styles = {
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
};

let MultiPicker = React.createClass({
	render() {
		console.log(this.props);
		return (
			<View style={styles.container}>
				<Text>
					This is Sparta!
				</Text>
			</View>
		);
	},
});

module.exports = MultiPicker;