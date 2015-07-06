'use strict';

var React = require('react-native'),
	Reflux = require('reflux'),
	Api = require('../../core/Api'),
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
		marginTop: 78,
		flex: 1,
	},

	searchBar: {
		height: 40,
		borderColor: 'grey',
		borderWidth: 1,
		borderRadius: 3,
		marginLeft: 16,
		marginRight: 16,
		marginBottom: 16,
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

			locations: [],
			showLocation: false,
			circles: [],
			showCircle: false,
			
			showRoomType: false,
			type: '',
			showMinPrice: false,
			minPrice: '',
			showMaxPrice: false,
			maxPrice: '',
			showGender: false,
			gender: '',
			showDiet: false,
			diet: '',
			showDrinking: false,
			drinking: '',
			showSmoking: false,
			smoking: '',
			showPets: false,
			pets: '',
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
		if (this.state.type !== '') {
			query += 'type=' + this.state.type + '&';
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

	renderRoommateOptions() {
		return (
			<View>
				<TouchableOpacity
				onPress={() => this.showPicker('showRoomType')}>
					<Text style={styles.selectText}>
						{this.renderPromptOrSelection('Property type', this.state.type)}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
				onPress={() => this.showPicker('showMinPrice')}>
					<Text style={styles.selectText}>
						{this.renderPromptOrSelection('Minimum price', this.state.minPrice)}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
				onPress={() => this.showPicker('showMaxPrice')}>
					<Text style={styles.selectText}>
						{this.renderPromptOrSelection('Maximum price', this.state.maxPrice)}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
				onPress={() => this.showPicker('showGender')}>
					<Text style={styles.selectText}>
						{this.renderPromptOrSelection('Gender Preference', this.state.gender)}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
				onPress={() => this.showPicker('showDiet')}>
					<Text style={styles.selectText}>
						{this.renderPromptOrSelection('Diet Preference', this.state.diet)}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
				onPress={() => this.showPicker('showSmoking')}>
					<Text style={styles.selectText}>
						{this.renderPromptOrSelection('Smoking Preference', this.state.smoking)}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
				onPress={() => this.showPicker('showPets')}>
					<Text style={styles.selectText}>
						{this.renderPromptOrSelection('Pets', this.state.pets)}
					</Text>
				</TouchableOpacity>
			</View>
		);
	},

	renderNonGenericContent() {
		switch(this.props.category) {
			case 'Roommates' : return this.renderRoommateOptions();
		}
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

				{this.renderNonGenericContent()}

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
				list={Api.roommatesFilterSet.propertyTypes} />

				<SinglePicker
				action={selected => this.selectItem('minPrice', selected, 'showMinPrice')}
				isVisible={this.state.showMinPrice}
				label={'minimum price'}
				list={Api.roommatesFilterSet.minPrice} />

				<SinglePicker
				action={selected => this.selectItem('maxPrice', selected, 'showMaxPrice')}
				isVisible={this.state.showMaxPrice}
				label={'maximum price'}
				list={Api.roommatesFilterSet.maxPrice} />

				<SinglePicker
				action={selected => this.selectItem('gender', selected, 'showGender')}
				isVisible={this.state.showGender}
				label={'gender preference'}
				list={Api.roommatesFilterSet.gender} />

				<SinglePicker
				action={selected => this.selectItem('diet', selected, 'showDiet')}
				isVisible={this.state.showDiet}
				label={'diet preference'}
				list={Api.roommatesFilterSet.diet} />

				<SinglePicker
				action={selected => this.selectItem('smoking', selected, 'showSmoking')}
				isVisible={this.state.showSmoking}
				label={'smoking preference'}
				list={Api.roommatesFilterSet.smoking} />

				<SinglePicker
				action={selected => this.selectItem('drinking', selected, 'showDrinking')}
				isVisible={this.state.showDrinking}
				label={'drinking preference'}
				list={Api.roommatesFilterSet.drinking} />

				<SinglePicker
				action={selected => this.selectItem('pets', selected, 'showPets')}
				isVisible={this.state.showPets}
				label={'pets preference'}
				list={Api.roommatesFilterSet.pets} />
			</View>
		);
	},
});

module.exports = Search;
