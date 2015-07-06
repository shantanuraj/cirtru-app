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
	TouchableOpacity,
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

	selectText: {
		marginLeft: 16,
		marginBottom: 16,
		fontSize: 18,
		padding: 8,
		color: Colors.brandSecondary,
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
			
			locations: [],
			showLocation: false,
		};
	},

	locationsQuery() {
		var query = 'primaryLocation=';
		this.state.locations.forEach(location => query += location + ',');
		return query += '&';
	},

	buildQueryString() {
		var query = '';
		if (this.state.searchBox !== '') {
			query += 'searchBox=' + this.state.searchBox + '&';
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
		if (this.state.locations.length > 0) {
			query += this.locationsQuery();
		}
		return query;
	},

	onPress() {
		var queries = this.buildQueryString();
		console.log(queries);
		this.props.action(queries);
	},

	showLocationPicker() {
		this.setState({ showLocation: true });
	},

	selectLocation(locations) {
		this.setState({
			locations,
			showLocation: false,
		});
	},

	renderPromptOrNumber(prompt, info, items) {
		info = ' ' + info;
		if (items.length === 1) {
			info = info.substring(0, info.length - 1);
		}
		info += ' selected';
		return items.length > 0 ? items.length + info: prompt;
	},

	render() {
		var options = this.state.filterStore.options[this.props.category];
		console.log(options.location);
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

				<TouchableOpacity
				onPress={this.showLocationPicker}>
					<Text style={styles.selectText}>
						{this.renderPromptOrNumber('Select Location', 'locations', this.state.locations)}
					</Text>
				</TouchableOpacity>

				<TouchableHighlight
				onPress={this.onPress}
				style={styles.searchButton}>
					<Text style={styles.buttonText}>
						Search
					</Text>
				</TouchableHighlight>

				<Picker 
				action={this.selectLocation}
				isVisible={this.state.showLocation}
				label={'location'}
				list={options.location} />
			</View>
		);
	},
});

module.exports = Search;
