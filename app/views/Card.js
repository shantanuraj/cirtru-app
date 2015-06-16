'use strict';

var React = require('react-native'),
	Api = require('../core/Api'),
	Colors = require('../core/Colors'),
	window = require('Dimensions').get('window');

var {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableHighlight,
} = React;

var styles = StyleSheet.create({
	card: {
		width: window.width,
		height: 300,	
		backgroundColor: '#fff',
		shadowColor: "black",
		shadowOpacity: 0.3,
		shadowRadius: 3,
		shadowOffset: {
			height: 0,
			width: 0
		},
	},

	poster: {
		height: 300,
		width: window.width,
		tintColor: '#FFF',
		alignItems: 'center',
		justifyContent: 'center',
	},

	backdrop: {
		backgroundColor: 'rgba(0,0,0,0.3)',
		flex: 1,
		width: window.width,
		alignItems: 'center',
		justifyContent: 'center',
	},

	leadText: {
		color: Colors.white,
		fontSize: 32,
		fontWeight: '500',
	},
});

var Card = React.createClass({
	openListings: function() {
		var category = this.props.type;
	},

	render: function() {
		var type = this.props.type;
		var image = Api.cardImage(type);
		console.log(type, image);
		return (
			<TouchableHighlight underlayColor="transparent" onPress={this.openListings}>
				<View style={styles.card}>
					<Image
					  style={styles.poster}
					  source={{uri: image}}>
					  	<View style={styles.backdrop}>
					  		<Text style={styles.leadText}>
					  			{type}
					  		</Text>
					  	</View>
					</Image>
				</View>
			</TouchableHighlight>
		);
	}
});

module.exports = Card;