'use strict';

var React = require('react-native'),
	Api = require('../core/Api'),
	Colors = require('../core/Colors');

var {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableHighlight,
} = React;

var styles = StyleSheet.create({
	card: {
		backgroundColor: Colors.white,
		shadowColor: Colors.black,
		shadowOpacity: 0.3,
		shadowRadius: 3,
		shadowOffset: {
			height: 0,
			width: 0,
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

var MiniCard = React.createClass({
	propTypes: {
		action: React.PropTypes.func.isRequired,
		dimen: React.PropTypes.number.isRequired,
		type: React.PropTypes.string.isRequired,
	},

	action() {
		if (this.props.action) {
			this.props.action();
		}
	},

	render() {
		var type = this.props.type,
			image = Api.miniCardImage(type);
		var derivedStyle = {
			width: this.props.dimen,
			height: (this.props.dimen < 200) ? this.props.dimen : this.props.dimen / 2,
		};
		return (
			<TouchableHighlight onPress={this.action} underlayColor={Colors.transparent}>
				<View style={[styles.card, derivedStyle]}>
					<Image source={{uri: image}} style={[styles.poster, derivedStyle]} >
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

module.exports = MiniCard;
