'use strict';

let React = require('react-native'),
	Reflux = require('reflux'),
	Api = require('../core/Api'),
	Colors = require('../core/Colors'),
	FabButton = require('./util/FabButton'),
	FilterStore = require('../store/FilterStore');

let { Icon } = require('react-native-icons');
let {
	TouchableHighlight,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	View,
	Text,
} = React;

let window = require('Dimensions').get('window');

let styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	searchBarContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: 70,
		width: window.width,
		padding: 16,
		marginTop: 60,
		backgroundColor: Colors.brandSecondaryLighter,
	},

	searchBar: {
		height: 40,
		color: Colors.white,
		borderColor: Colors.transparent,
		borderWidth: 1,
		borderRadius: 3,
		padding: 8,
	},

	commonContent: {
		position: 'absolute',
		top: 130,
		left: 0,
		padding: 16,
		width: window.width,
	},

	row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

	fabPicker: {
        backgroundColor: Colors.brandSecondaryLight,
        width: 108,
        height: 108,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 54,
        justifyContent: 'flex-start',
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },

    fabContent: {
    	width: 108,
        height: 108,
    	backgroundColor: Colors.transparent,
    	justifyContent: 'center',
    	alignItems: 'center',
    	paddingBottom: 8,
    },

    icon: {
        width: 48,
        height: 48,
    },

	subText: {
		fontSize: 16,
		color: Colors.white,
	},

	buttonContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		height: 70,
		width: window.width,
		padding: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},

	button: {
		width: window.width - 32,
		height: 50,
		padding: 8,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
		backgroundColor: Colors.brandSecondaryLight,
		shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
            height: 0,
            width: 0,
        },
	},

	buttonText: {
		fontSize: 20,
		color: Colors.white,
	},
});

let Search = React.createClass({
	renderPromptCircle(icon, label) {
		return (
			<TouchableHighlight
			style={styles.fabPicker}
			underlayColor={Colors.brandSecondary}>
				<View style={styles.fabContent}>
				    <Icon
				    name={icon}
				    size={32}
				    color={Colors.white}
				    style={styles.icon} />
				    <Text style={styles.subText}>
				    	{label}
				    </Text>
			    </View>
			</TouchableHighlight>
		);
	},

	render() {
		console.log(this.state);
		return (
			<View style={styles.container}>
				<View style={styles.searchBarContainer}>
					<TextInput
					autoFocus={true}
					onChangeText={ searchBox => this.setState({ searchBox }) }
					placeholderTextColor={Colors.white}
					placeholder={'Enter search query'}
					style={styles.searchBar} />
				</View>
				<View style={styles.commonContent}>
					<View style={styles.row}>
						{this.renderPromptCircle('ion|map', 'Location')}
						{this.renderPromptCircle('ion|ios-circle-filled', 'Circle')}
					</View>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableHighlight style={styles.button}
					underlayColor={Colors.brandSecondary}
					onPress={this.props.action}>
						<Text style={styles.buttonText}>
							Search
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	},
});

module.exports = Search;