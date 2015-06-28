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
				style={styles.button}>
					<Text style={styles.buttonText}>
						My Listings
					</Text>
				</TouchableHighlight>
				
				<TouchableHighlight
				underlayColor={Colors.brandPrimary}
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
				
				{this.makeToast('You need to verify your work email', !this.state.user.workVerified)}
				{this.makeToast('You need to verify your email', !this.state.user.emailVerified)}
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

	makeToast(content, visibility) {
		return (
			<Toast isVisible={visibility} mode={'warn'}>
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

	buttonText: {
	    color: 'white',
	    fontFamily: 'HelveticaNeue-Medium',
	    fontSize: 18,
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
		padding: 15,
		backgroundColor: Colors.transparent,
		fontSize: 16,
		fontWeight: 'bold',
		alignSelf: 'center',
    },

    email: {
    	fontSize: 18,
    	fontWeight: '300',
    	color: Colors.white,
    },

    heading: {
    	fontSize: 18,
    	fontWeight: 'bold',
    	color: Colors.white,
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

module.exports = Profile;
