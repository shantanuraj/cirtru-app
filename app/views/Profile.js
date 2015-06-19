'use strict';

var React = require('react-native'),
	Reflux = require('reflux'),
	Icon = require('FAKIconImage'),
	Colors = require('../core/Colors'),
	UserActions = require('../actions/UserActions'),
	UserStore = require('../store/UserStore'),
	Login = require('./Login');

var {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableHighlight,
} = React;

var Profile = React.createClass({
	mixins: [Reflux.connect(UserStore, 'user')],

	render() {
		if (!this.state.user.isLoggedIn) {
			return <Login {...this.props} />;
		} else {
			return this.profilePage();
		}
	},

	profilePage() {
		return (
			<View style={styles.container}>
				<Text>
					Welcome {this.state.user.name}
				</Text>
			</View>
		);
	},
});

var styles = StyleSheet.create({
	container: {
	    flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
	},

	signInText: {
	    color: 'white',
	    marginLeft: 5,
	    fontFamily: 'HelveticaNeue-Medium',
	    fontSize: 15,
	},

	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: 210,
		padding: 5,
		borderRadius: 3,
		marginBottom: 10,
	},
});

module.exports = Profile;
