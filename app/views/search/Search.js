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
		if (this.state.searchBox) {
			query += 'searchBox=' + this.state.searchBox + '&';
		}
		if (this.state.make) {
			query += 'make=' + this.state.make + '&';
		}
		if (this.state.color) {
			query += 'color=' + this.state.color + '&';
		}
		if (this.state.year) {
			query += 'year=' + this.state.year + '&';
		}
		if (this.state.type) {
			query += 'type=' + this.state.type + '&';
		}
		if (this.state.minPrice) {
			query += 'lowerPrice=' + this.state.minPrice + '&';
		}
		if (this.state.maxPrice) {
			query += 'upperPrice=' + this.state.maxPrice + '&';
		}
		if (this.state.diet) {
			query += 'eatPreference=' + this.state.diet + '&';
		}
		if (this.state.drinking) {
			query += 'drinking=' + this.state.drinking + '&';
		}
		if (this.state.smoking) {
			query += 'smoking=' + this.state.smoking + '&';
		}
		if (this.state.pets) {
			query += 'pets=' + this.state.pets + '&';
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
				{this.renderSinglePicker('type', 'showRoomType', 'property type', Api.roommatesFilterSet.propertyTypes)}				
				{this.renderSinglePicker('minPrice', 'showMinPrice', 'minimum price', Api.roommatesFilterSet.minPrice)}
				{this.renderSinglePicker('maxPrice', 'showMaxPrice', 'maximum price', Api.roommatesFilterSet.maxPrice)}
				{this.renderSinglePicker('gender', 'showGender', 'gender preference', Api.roommatesFilterSet.gender)}
				{this.renderSinglePicker('diet', 'showDiet', 'diet preference', Api.roommatesFilterSet.diet)}
				{this.renderSinglePicker('smoking', 'showSmoking', 'smoking preference', Api.roommatesFilterSet.smoking)}
				{this.renderSinglePicker('drinking', 'showDrinking', 'drinking preference', Api.roommatesFilterSet.drinking)}
				{this.renderSinglePicker('pets', 'showPets', 'pet preference', Api.roommatesFilterSet.pets)}
			</View>
		);
	},

	renderSubletOptions() {
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
				{this.renderSinglePicker('type', 'showRoomType', 'property type', Api.roommatesFilterSet.propertyTypes)}				
				{this.renderSinglePicker('minPrice', 'showMinPrice', 'minimum price', Api.roommatesFilterSet.minPrice)}
				{this.renderSinglePicker('maxPrice', 'showMaxPrice', 'maximum price', Api.roommatesFilterSet.maxPrice)}
			</View>
		);
	},

	renderNonGenericContent() {
		switch(this.props.category) {
			case 'Roommates': return this.renderRoommateOptions();
			case 'Sublets': return this.renderSubletOptions();
		}
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

	renderPromptOrSelection(prompt, item) {
		return item ? prompt + ' - ' + item : prompt;
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
			</View>
		);
	},
});

module.exports = Search;
