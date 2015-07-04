'use strict';

var React = require('react-native'),
	Reflux = require('reflux'),
	Colors = require('../../core/Colors'),
	FilterActions = require('../../actions/FilterActions');

var {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableHighlight,
} = React;

var styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		marginTop: 65,
		flex: 1,
	},

	searchBar: {
		height: 40,
		borderColor: 'grey',
		borderWidth: 1,
		borderRadius: 3,
		margin: 16,
		padding: 8,
	},

	searchButton: {
		height: 38,
        backgroundColor: Colors.brandSecondary,
        borderColor: Colors.brandSecondary,
        borderWidth: 1,
        borderRadius: 3,
        marginBottom: 10,
        justifyContent: 'center',
        marginLeft: 16,
        marginRight: 16,
	},

	buttonText: {
        fontSize: 24,
        color: 'white',
        alignSelf: 'center',
    },
});

var Search = React.createClass({
	onPress() {
		var query = 'searchBox=' + this.state.searchBox;
		FilterActions.filterList(this.props.category, query);
		this.props.navigator.pop();
	},

	render() {
		return (
			<View style={styles.container}>
				<TextInput
				autoFocus={true}
				onChangeText={ searchBox => this.setState({ searchBox }) }
				placeholder={'Enter search query'}
				placeholderTextColor={Colors.grey}
				style={styles.searchBar} />
				<TouchableHighlight
				onPress={this.onPress}
				style={styles.searchButton}>
					<Text style={styles.buttonText}>
						Search
					</Text>
				</TouchableHighlight>
			</View>
		);
	},
});

module.exports = Search;
