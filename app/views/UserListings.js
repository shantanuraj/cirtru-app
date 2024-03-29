'use strict';

var React = require('react-native'),
	Api = require('../core/Api'),
	Colors = require('../core/Colors'),
	MiniCard = require('./MiniCard'),
	ProductList = require('./ProductList'),
	Toast = require('./util/Toast'),
	TimerMixin = require('react-timer-mixin');

var	window = require('Dimensions').get('window');

var {
	TouchableOpacity,
	StyleSheet,
	View,
	Text,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.grey,
	},

	leadText: {
		fontSize: 32,
		fontWeight: 'bold',
		color: Colors.white,
		padding: 16,
	},

	grid: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},

	toastText: {
		color: Colors.white,
		padding: 15,
		backgroundColor: Colors.transparent,
		fontSize: 16,
		fontWeight: 'bold',
		alignSelf: 'center',
    },
});


var UserListings = React.createClass({
	mixins: [TimerMixin],

	getInitialState() {
		return {
			loaded: false,
			listings: null,
			showToast: false,
		};
	},

	componentDidMount() {
		fetch(Api.userListings())
		.then(response => response.json())
		.then(response => Api.adaptUserListings(response))
		.then(listings => this.setState({
			loaded: true,
			listings: listings,
		}))
		.done();
	},

	renderGroup(card1, card2) {
		return (
			<View style={styles.grid}>
				{card1}
				{card2}
			</View>
		);
	},

	action(category) {
		if (!this.state.loaded) {
			return () => {
				console.log('Loading data');
			};
		}
		var self = this;
		return function() {
			if (self.state.listings[category].length === 0) {
				self.setState({ showToast: true });
				self.setTimeout(() => self.setState({ showToast: false }), 1500);
			} else {
				self.props.navigator.push({
					title: category,
					component: ProductList,
					passProps: {
						list: self.state.listings[category],
						isOwner: true,
					},
				});
			}
		};
	},

	makeToast(content, visibility, mode) {
		return (
			<Toast isVisible={visibility} mode={mode}>
                <TouchableOpacity>
                    <Text style={styles.toastText}>
                        {content}
                    </Text>
                </TouchableOpacity>
            </Toast>
		);
	},

	render() {
		var categories = Api.categories,
			category = categories[0],
			categories = categories.slice([1]),
			Cards = categories.map((category, i) => <MiniCard {...this.props} key={i} type={category} dimen={window.width / 2} action={this.action(category)} />);

		return (
			<View style={styles.container}>
				<MiniCard {...this.props} action={this.action(category)} dimen={window.width} key={192} type={category} />
				{this.renderGroup(Cards[0], Cards[1])}
				<MiniCard {...this.props} action={this.action('Others')} dimen={window.width} key={193} type={'Others'} />
				{this.makeToast('No listings in this section', this.state.showToast, 'brandPrimary')}
			</View>
		);
	},
});

module.exports = UserListings;
