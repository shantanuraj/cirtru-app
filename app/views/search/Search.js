'use strict';

var React = require('react-native'),
	Reflux = require('reflux'),
	Colors = require('../../core/Colors'),
	Picker = require('../util/Picker'),
	FilterStore = require('../../store/FilterStore');

var {
	StyleSheet,
	View,
	Text,
	TextInput,
	PickerIOS,
	TouchableHighlight,
} = React;

var PickerItemIOS = PickerIOS.Item;

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
	mixins: [Reflux.connect(FilterStore, 'filterStore')],

	location: null,

	getInitialState() {
		return {
			searchBox: '',
			primaryLocation: '',
			circle: '',
			make: '',
			color: '',
			year: '',
			loaded: false,
		};
	},

	buildQueryString() {
		var query = '';
		if (this.state.searchBox !== '') {
			query += 'searchBox=' + this.state.searchBox + '&';
		}
		if (this.state.primaryLocation != '') {
			query += 'primaryLocation=' +	this.state.primaryLocation + '&';
		}
		if (this.state.circle !== '') {
			query += 'circle=' + this.state.circle + '&';
		}
		if (this.state.make !== '') {
			query += 'make=' + this.state.make + '&';
		}
		if (this.state.color !== '') {
			query += 'color=' + this.state.color + '&';
		}
		if (this.state.year !== '') {
			query += 'year=' + this.state.year + '&';
		}
		return query;
	},

	onPress() {
		var queries = this.buildQueryString();
		this.props.action(queries);
	},

	render() {
		var options = this.state.filterStore.options[this.props.category];
		return (
			<View style={styles.container}>
				<TextInput
				autoFocus={true}
				onChangeText={ searchBox => this.setState({ searchBox }) }
				placeholder={'Enter search query'}
				placeholderTextColor={Colors.grey}
				style={styles.searchBar} />

				<TextInput
				onChangeText={ circle => this.setState({ circle }) }
				placeholder={'Enter circle'}
				placeholderTextColor={Colors.grey}
				style={styles.searchBar} />

				<Text>
					Location
				</Text>

				<TouchableHighlight
				onPress={this.onPress}
				style={styles.searchButton}>
					<Text style={styles.buttonText}>
						Search
					</Text>
				</TouchableHighlight>

				<Picker 
				isVisible={true}
				label={'location'}
				list={options.location} />
			</View>
		);
	},
});

module.exports = Search;
