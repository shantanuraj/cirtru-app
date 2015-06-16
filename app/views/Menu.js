'use strict';

var React = require('react-native'),
	Colors = require('../core/Colors'),
	window = require('Dimensions').get('window');

var {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TouchableHighlight,
} = React;

var styles = StyleSheet.create({
	menu: {
		flex: 1,
		width: window.width,
		height: window.height,
		backgroundColor: '#222',
		paddingTop: 20,
	},
	textContainer: {
		flex: 1,
		margin: 16,
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		flex: 1,
	},
	button: {
		backgroundColor: Colors.brandSecondary,
		padding: 16,
		marginRight: window.width/3,
		marginLeft: 2,
		marginBottom: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginButton: {
		backgroundColor: Colors.grey,
		marginRight: window.width/3,
		padding: 16,
		margin: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	item: {
		fontSize: 20,
		fontWeight: '300',
		color: Colors.background,
	},
	bannerText: {
		fontSize: 24,
		color: Colors.background,
	},
});

var Menu = React.createClass({
	render: function() {
		var items = ['Roommates', 'Rentals', 'Sublets', 'Furniture', 'For Sale'].map(this.renderItem);
		return (
			<ScrollView style={styles.menu}>
        		<View style={styles.textContainer}>
          			<Text style={styles.bannerText}>Shantanu Raj</Text>
        		</View>
        		{items}
        		<TouchableHighlight 
        		style={styles.loginButton}
        		underlayColor="transparent">
        			<Text style={styles.item}>
        				Log out
        			</Text>
        		</TouchableHighlight>
      		</ScrollView>
		);
	},
	renderItem: function(item) {
		return (
			<TouchableHighlight 
			style={styles.button}
			underlayColor="transparent">
				<Text style={styles.item}>
					{item}
				</Text>
			</TouchableHighlight>
		);
	}
});

module.exports = Menu;
