'use strict';

var React = require('react-native'),
	Reflux = require('reflux'),
	Colors = require('../../core/Colors'),
	Picker = require('../util/Picker'),
	SinglePicker = require('../util/SinglePicker'),
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
        margin: 12,
        backgroundColor: Colors.brandSecondary,
        borderColor: Colors.brandSecondary,
        borderWidth: 1,
        borderRadius: 3,
        justifyContent: 'center',
	},

	selectText: {
		marginLeft: 16,
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
			make: '',
			color: '',
			year: '',
			
			showRoomType: false,
			type: '',

			locations: [],
			showLocation: false,

			circles: [],
			showCircle: false,
		};
	},

	dynamicQuery(query, options) {
		if (options.length === 0) {
			return '';
		} else {
			query += '=';
			options.forEach(option => query += option + ',');
			return query += '&';
		}
	},

	buildQueryString() {
		var query = '';
		if (this.state.searchBox !== '') {
			query += 'searchBox=' + this.state.searchBox + '&';
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

		query += this.dynamicQuery('primaryLocation', this.state.locations);
		query += this.dynamicQuery('circle', this.state.circles);
		return query;
	},

	onPress() {
		var queries = this.buildQueryString();
		console.log(queries);
		this.props.action(queries);
	},

	showPicker(title) {
		var state = this.state;
		state[title] = true;
		this.setState(state);
	},

	selectLocation(locations) {
		this.setState({
			locations,
			showLocation: false,
		});
	},

	selectCircle(circles) {
		this.setState({
			circles,
			showCircle: false,
		});
	},

	selectItem(key, val, visibility) {
		var state = this.state;
		state[key] = val;
		state[visibility] = false;
		this.setState(state);
	},

	renderPromptOrSelection(prompt, item) {
		return item !== '' ? prompt + ' - ' + item : prompt;
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
				onPress={() => this.showPicker('showLocation')}>
					<Text style={styles.selectText}>
						{this.renderPromptOrNumber('Select Location', 'locations', this.state.locations)}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
				onPress={() => this.showPicker('showCircle')}>
					<Text style={styles.selectText}>
						{this.renderPromptOrNumber('Select Circle', 'circles', this.state.circles)}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
				onPress={() => this.showPicker('showRoomType')}>
					<Text style={styles.selectText}>
						{this.renderPromptOrSelection('Property type', this.state.type)}
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

				<Picker 
				action={this.selectCircle}
				isVisible={this.state.showCircle}
				label={'circle'}
				list={options.circle} />

				<SinglePicker
				action={selected => this.selectItem('type', selected, 'showRoomType')}
				isVisible={this.state.showRoomType}
				label={'property type'}
				list={['Private Room', 'Shared Room']} />
			</View>
		);
	},
});

module.exports = Search;
