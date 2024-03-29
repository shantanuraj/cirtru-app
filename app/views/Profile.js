'use strict';

var React = require('react-native'),
	Reflux = require('reflux'),
	Colors = require('../core/Colors'),
	UserActions = require('../actions/UserActions'),
	UserStore = require('../store/UserStore'),
	ProfileStore = require('../store/ProfileStore'),
	Login = require('./Login'),
	ChangePassword = require('./ChangePassword'),
	UserListings = require('./UserListings'),
	UserEditor = require('./UserEditor'),
	Toast = require('./util/Toast'),
	TimerMixin = require('react-timer-mixin'),
	window = require('Dimensions').get('window');

var { Icon } = require('react-native-icons');

var {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableHighlight,
} = React;

var styles = StyleSheet.create({
	container: {
	    flex: 1,
		alignItems: 'center',
	    justifyContent: 'center',
	},

	buttonText: {
	    color: 'white',
	    fontFamily: 'HelveticaNeue-Medium',
	    fontSize: 16,
	},

	button: {
		backgroundColor: Colors.brandPrimary,
		alignItems: 'center',
		justifyContent: 'center',
		width: window.width - 24,
		margin: 8,
		padding: 8,
		borderRadius: 3,
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
		fontSize: 42,
		fontWeight: '300',
	},

	toastText: {
		color: Colors.white,
		padding: 16,
		backgroundColor: Colors.transparent,
		fontSize: 16,
		fontWeight: 'bold',
		alignSelf: 'center',
    },

    email: {
    	fontSize: 16,
		fontWeight: '300',
		color: Colors.white,
    },

    heading: {
		fontSize: 16,
		fontWeight: 'bold',
		color: Colors.white,
		alignItems: 'center',
    },

    row: {
        width: window.width,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.brandPrimary,
        padding: 12,
        margin: 8,
    },
});

var Profile = React.createClass({
	mixins: [Reflux.connect(UserStore, 'user'), Reflux.connect(ProfileStore, 'status'), TimerMixin],

	render() {
		if (this.state.status !== 'none') {
			this.setTimeout(this.hideToast, 1500);
		}
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
				</Text>

				<View style={styles.row}>
					<Text style={styles.heading}>
						Emails
					</Text>
                	<Text style={styles.email}>
                		{this.state.user.email}
                	</Text>
                	{this.renderWorkMailOrPrompt()}
                </View>

				<TouchableHighlight
				underlayColor={Colors.brandPrimary}
				onPress={this.showListings}
				style={styles.button}>
					<Text style={styles.buttonText}>
						My Listings
					</Text>
				</TouchableHighlight>

				<TouchableHighlight
				underlayColor={Colors.brandPrimary}
				onPress={this.showEditor}
				style={styles.button}>
					<Text style={styles.buttonText}>
						Edit Profile
					</Text>
				</TouchableHighlight>

				<TouchableHighlight
				underlayColor={Colors.brandPrimary}
				onPress={this.changePassword}
				style={styles.button}>
					<Text style={styles.buttonText}>
						Change Password
					</Text>
				</TouchableHighlight>

				<TouchableHighlight
				onPress={this.logout}
				style={styles.logout}>
					<Text style={styles.buttonText}>
						Logout
					</Text>
				</TouchableHighlight>

				{this.makeToast('Success', this.state.status === 'success', 'success')}
				{this.makeToast('Could not complete request', this.state.status === 'error', 'warn')}
			</View>
		);
	},

	renderWorkMailOrPrompt() {
		if (this.state.user.workVerified) {
			return (
				<Text style={styles.email}>
					{this.state.user.workEmail}
				</Text>
			);
		} else if (!this.state.user.emailVerified) {
			return;
		} else {
			return (
				<TouchableOpacity>
					<Text style={styles.heading}>
						Click here to add your work/school email.
					</Text>
				</TouchableOpacity>
			);
		}
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

	changePassword() {
		if (!this.state.user.emailVerified) {
			return;
		}
		this.props.navigator.push({
			title: 'Change Password',
			component: ChangePassword,
		});
	},

	hideToast() {
		this.setState({ status: 'none' });
	},

	logout() {
		UserActions.logout();
	},

	showListings() {
		if (!this.state.user.emailVerified) {
			return;
		}
		this.props.navigator.push({
			title: 'My listings',
			component: UserListings,
		});
	},

	showEditor() {
		this.props.navigator.push({
			title: 'Edit Profile',
			component: UserEditor,
		});
	},
});

module.exports = Profile;
