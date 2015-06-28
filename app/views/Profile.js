'use strict';

var React = require('react-native'),
	Reflux = require('reflux'),
	Icon = require('FAKIconImage'),
	Colors = require('../core/Colors'),
	UserActions = require('../actions/UserActions'),
	UserStore = require('../store/UserStore'),
	Login = require('./Login'),
	Toast = require('./util/Toast'),
	window = require('Dimensions').get('window');

var {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
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
				<Text style={styles.name}>
					{this.state.user.name}
					{this.state.email}
				</Text>
				<TouchableHighlight
				onPress={this.logout}
				style={styles.logout}>
					<Text style={styles.logoutText}>
						Logout
					</Text>
				</TouchableHighlight>
				{this.makeToast('You need to verify your work email', !this.state.user.workVerified)}
				{this.makeToast('You need to verify your email', !this.state.user.emailVerified)}
			</View>
		);
	},

	makeToast(content, visibility) {
		return (
			<Toast isVisible={visibility}>
                <TouchableOpacity>
                    <Text style={styles.toastText}>
                        {content}
                    </Text>
                </TouchableOpacity>
            </Toast>
		);
	},

	logout() {
		UserActions.logout();
	},
});

var styles = StyleSheet.create({
	container: {
	    flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
	},

	logoutText: {
	    color: 'white',
	    fontFamily: 'HelveticaNeue-Medium',
	    fontSize: 18,
	},

	logout: {
		position: 'absolute',
		backgroundColor: Colors.danger,
		bottom: 60,
		left: 0,
		alignItems: 'center',
		justifyContent: 'center',
		width: window.width - 24,
		margin: 12,
		padding: 8,
		borderRadius: 3,
		marginBottom: 60,
	},

	name: {
		fontSize: 32,
		fontWeight: '300',
	},

	toastText: {
		color: '#ffffff',
		padding: 15,
		backgroundColor: 'transparent',
		fontSize: 16,
		fontWeight: 'bold',
		alignSelf: 'center',
    },
});

module.exports = Profile;
