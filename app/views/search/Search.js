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

			location: [],
			showLocation: false,
			circle: [],
			showCircle: false,
			year: [],
			showYear: false,
			make: [],
			showMake: false,
			color: [],
			showColor: false,
			
			showRoomType: false,
			type: null,
			showMinPrice: false,
			minPrice: null,
			showMaxPrice: false,
			maxPrice: null,
			showGender: false,
			gender: null,
			showDiet: false,
			diet: null,
			showDrinking: false,
			drinking: null,
			showSmoking: false,
			smoking: null,
			showPets: false,
			pets: null,
			showTitleStatus: false,
			titleStatus: null,
			showMinMileage: false,
			minMileage: null,
			showMaxMileage: false,
			maxMileage: null,
		};
	},

	staticQuery(query, option) {
		return option ? query + '=' + option + '&' : '';
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
		query += this.staticQuery('searchBox', this.state.searchBox);
		query += this.staticQuery('type', this.state.type);
		query += this.staticQuery('lowerPrice', this.state.minPrice);
		query += this.staticQuery('upperPrice', this.state.maxPrice);
		query += this.dynamicQuery('primaryLocation', this.state.location);
		query += this.dynamicQuery('circle', this.state.circle);

		query += this.staticQuery('drinking', this.state.drinking);
		query += this.staticQuery('smoking', this.state.smoking);
		query += this.staticQuery('gender', this.state.gender);
		query += this.staticQuery('eatPreference', this.state.diet);
		query += this.staticQuery('pets', this.state.pets);

		query += this.staticQuery('titleStatus', this.state.titleStatus);
		query += this.staticQuery('lowerMileage', this.state.minMileage);
		query += this.staticQuery('upperMileage', this.state.maxMileage);
		query += this.dynamicQuery('make', this.state.make);
		query += this.dynamicQuery('year', this.state.year);
		query += this.dynamicQuery('color', this.state.color);

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

	selectItem(key, val, visibility) {
		var state = this.state;
		state[key] = val;
		state[visibility] = false;
		this.setState(state);
	},

	renderPromptOrSelection(prompt, item) {
		return item ? prompt + ' - ' + item : prompt;
	},

	renderPromptOrNumber(prompt, info, items) {
		info = ' ' + info;
		if (items.length > 1) {
			info += 's';
		}
		info += ' selected';
		return items.length > 0 ? items.length + info: prompt;
	},

	renderSinglePicker(key, visibility, label, list) {
		return (
			<SinglePicker
			action={selected => this.selectItem(key, selected, visibility)}
			isVisible={this.state[visibility]}
			label={label}
			list={list} />
		);
	},

	renderMultiPicker(label, list, visibility) {
		return (
			<Picker
			action={(list)=> {
				var state = this.state;
				state[visibility] = false;
				state[label] = list
				this.setState({ state });
			}}
			isVisible={this.state[visibility]}
			label={label}
			list={list} />
		);
	},

	renderPrompt(label, val, visibility) {
		return (
			<TouchableOpacity
			onPress={() => this.showPicker(visibility)}>
				<Text style={styles.selectText}>
					{this.renderPromptOrSelection(label, val)}
				</Text>
			</TouchableOpacity>
		);
	},

	renderMultiPrompt(label, val, visibility) {
		return (
			<TouchableOpacity
			onPress={() => this.showPicker(visibility)}>
				<Text style={styles.selectText}>
					{this.renderPromptOrNumber(label, val, this.state[val])}
				</Text>
			</TouchableOpacity>
		);
	},

	renderRoommateOptions() {
		return (
			<View>
				{this.renderPrompt('Property type', this.state.type, 'showRoomType')}
				{this.renderSinglePicker('type', 'showRoomType', 'property type', Api.roommatesFilterSet.propertyTypes)}				

				{this.renderPrompt('Minimum price', this.state.minPrice, 'showMinPrice')}
				{this.renderSinglePicker('minPrice', 'showMinPrice', 'minimum price', Api.roommatesFilterSet.minPrice)}

				{this.renderPrompt('Maximum price', this.state.maxPrice, 'showMaxPrice')}
				{this.renderSinglePicker('maxPrice', 'showMaxPrice', 'maximum price', Api.roommatesFilterSet.maxPrice)}

				{this.renderSinglePicker('gender', 'showGender', 'gender preference', Api.roommatesFilterSet.gender)}
				{this.renderPrompt('Gender preference', this.state.gender, 'showGender')}

				{this.renderPrompt('Diet preference', this.state.diet, 'showDiet')}
				{this.renderSinglePicker('diet', 'showDiet', 'diet preference', Api.roommatesFilterSet.diet)}

				{this.renderPrompt('Smoking preference', this.state.smoking, 'showSmoking')}
				{this.renderSinglePicker('smoking', 'showSmoking', 'smoking preference', Api.roommatesFilterSet.smoking)}

				{this.renderPrompt('Drinking preference', this.state.drinking, 'showDrinking')}
				{this.renderSinglePicker('drinking', 'showDrinking', 'drinking preference', Api.roommatesFilterSet.drinking)}

				{this.renderPrompt('Pets', this.state.pets, 'showPets')}
				{this.renderSinglePicker('pets', 'showPets', 'pet preference', Api.roommatesFilterSet.pets)}
			</View>
		);
	},

	renderSubletOptions() {
		return (
			<View>
				{this.renderPrompt('Property type', this.state.type, 'showRoomType')}
				{this.renderSinglePicker('type', 'showRoomType', 'property type', Api.subletsFilterSet.propertyTypes)}

				{this.renderPrompt('Maximum price', this.state.maxPrice, 'showMaxPrice')}
				{this.renderSinglePicker('maxPrice', 'showMaxPrice', 'maximum price', Api.subletsFilterSet.maxPrice)}

				{this.renderPrompt('Minimum price', this.state.minPrice, 'showMinPrice')}
				{this.renderSinglePicker('minPrice', 'showMinPrice', 'minimum price', Api.subletsFilterSet.minPrice)}
			</View>
		);
	},

	renderCarOptions() {
		var options = this.state.filterStore.options[this.props.category];
		return (
			<View>
				{this.renderPrompt('Title status', this.state.titleStatus, 'showTitleStatus')}
				{this.renderSinglePicker('titleStatus', 'showTitleStatus', 'title status', Api.carsFilterSet.titleStatus)}

				{this.renderPrompt('Maximum price', this.state.maxPrice, 'showMaxPrice')}
				{this.renderSinglePicker('maxPrice', 'showMaxPrice', 'maximum price', Api.carsFilterSet.maxPrice)}

				{this.renderPrompt('Minimum price', this.state.minPrice, 'showMinPrice')}
				{this.renderSinglePicker('minPrice', 'showMinPrice', 'minimum price', Api.carsFilterSet.minPrice)}


				{this.renderPrompt('Maximum mileage', this.state.maxMileage, 'showMaxPrice')}
				{this.renderSinglePicker('maxMileage', 'showMaxMileage', 'maximum mileage', Api.carsFilterSet.maxMileage)}

				{this.renderPrompt('Minimum mileage', this.state.minMileage, 'showMinMileage')}
				{this.renderSinglePicker('minMileage', 'showMinMileage', 'minimum mileage', Api.carsFilterSet.minMileage)}

				{this.renderMultiPrompt('Make', 'make', 'showMake')}
				{this.renderMultiPrompt('Color', 'color', 'showColor')}
				{this.renderMultiPrompt('Years', 'year', 'showYear')}
			</View>
		);
	},

	renderNonGenericContent() {
		switch(this.props.category) {
			case 'Roommates': return this.renderRoommateOptions();
			case 'Sublets': return this.renderSubletOptions();
			case 'Cars': return this.renderCarOptions();
		}
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

				{this.renderMultiPrompt('Location', 'location', 'showLocation')}
				{this.renderMultiPicker('location', options.location, 'showLocation')}
				
				{this.renderMultiPrompt('Circle', 'circle', 'showCircle')}
				{this.renderMultiPicker('circle', options.circle, 'showCircle')}

				{this.renderMultiPicker('make', options.make, 'showMake')}
				{this.renderMultiPicker('year', options.year, 'showYear')}
				{this.renderMultiPicker('color', options.color, 'showColor')}

				{this.renderNonGenericContent()}

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
