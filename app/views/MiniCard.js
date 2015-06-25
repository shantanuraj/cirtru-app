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

var cardWidth = window.width / 2;

var MiniCard = React.createClass({
	openCreatePage() {
		var category = this.props.type;
	},

	render() {
		var type = this.props.type,
			image = Api.miniCardImage(type);
		var derivedStyle = {
			width: this.props.dimen,
			height: this.props.dimen,
		};
		return (
			<TouchableHighlight underlayColor="transparent" onPress={this.openCreatePage}>
				<View style={[styles.card, derivedStyle]}>
					<Image
					  style={[styles.poster, derivedStyle]}
					  source={{uri: image}}>
					  	<View style={[styles.backdrop, derivedStyle]}>
					  		<Text style={styles.leadText}>
					  			{type}
					  		</Text>
					  	</View>
					</Image>
				</View>
			</TouchableHighlight>
		);
	},
});

var styles = StyleSheet.create({
	card: {
		backgroundColor: Colors.white,
		shadowColor: "black",
		shadowOpacity: 0.3,
		shadowRadius: 3,
		shadowOffset: {
			height: 0,
			width: 0
		},
	},

	poster: {
		tintColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'center',
	},

	backdrop: {
		backgroundColor: 'rgba(0,0,0,0.3)',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	leadText: {
		color: Colors.white,
		fontSize: 24,
		fontWeight: '500',
	},
});

module.exports = MiniCard;
