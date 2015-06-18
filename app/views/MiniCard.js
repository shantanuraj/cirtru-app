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

class MiniCard extends React.Component {
	constructor(props) {
		super(props);
		this.openCreatePage = this.openCreatePage.bind(this);
	}

	openCreatePage() {
		var category = this.props.type;
	}

	render() {
		var type = this.props.type;
		var image = Api.miniCardImage(type);
		return (
			<TouchableHighlight underlayColor="transparent" onPress={this.openCreatePage}>
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
}

var styles = StyleSheet.create({
	card: {
		width: window.width,
		height: 120,
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
		height: 120,
		width: window.width,
		tintColor: Colors.white,
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

module.exports = MiniCard;
