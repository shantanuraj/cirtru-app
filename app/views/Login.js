'use strict';

var React = require('react-native'),
	Reflux = require('reflux'),
	Icon = require('FAKIconImage'),
	Toast = require('./util/Toast'),
	Colors = require('../core/Colors'),
	EmailLogin = require('./EmailLogin'),
	TimerMixin = require('react-timer-mixin'),
	UserActions = require('../actions/UserActions'),
	ProfileStore = require('../store/ProfileStore'),
	ProfileActions = require('../actions/ProfileActions');

var window = require('Dimensions').get('window');

var {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TouchableHighlight,
} = React;


var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	brandIcon: {
		width: 28,
		height: 28,
		marginLeft: 5,
	},

	signInText: {
		color: 'white',
		marginLeft: 5,
		fontFamily: 'HelveticaNeue-Medium',
		fontSize: 15,
	},

	greetText: {
		marginTop: 32,
		color: Colors.brandSecondary,
		fontFamily: 'HelveticaNeue-Medium',
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

	dividerCircle: {
		margin: 12,
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderRadius: 25,
		borderColor: Colors.brandSecondary,
	},

	dividerText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: Colors.brandSecondary,
	},

	googleButton: {
		backgroundColor: Colors.Google,
	},

	facebookButton: {
		backgroundColor: Colors.Facebook,
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


var Login = React.createClass({
	mixins: [Reflux.connect(ProfileStore, 'status'), TimerMixin],
    
    getInitialState() {
        return {
            prompt: 'Sign in',
            greet: 'No account? Click here',
        };
    },

    loginFB() {
		UserActions.newFacebookSession();
	},

	togglePrompt() {
        var data = this.state;
		if (data.prompt === 'Sign in') {
            data.prompt = 'Sign up';
            data.greet = 'Already a Cirtru member? Please Sign in';
		} else {
			data.prompt = 'Sign in';
			data.greet = 'Don\'t have an account? Sign up';
		}
        this.setState(data);
	},

	toastTitle() {
		if (this.state.status === 'none') {
			return '';
		}
		
		var title;
		if (this.state.status === 'success') {
			title = 'Check your email';
		} else if (this.state.status === 'error') {
			title = 'Could not reset password';
		}
		this.setTimeout(ProfileActions.resetStore, 1500);
		return title;
	},

    render() {
		return (
			<View style={styles.container}>
				{/*<TouchableHighlight
				underlayColor={Colors.white}>
					<View
					style={[styles.button, styles.googleButton]}>
						<Icon
						name='fontawesome|google'
						size={28}
						color={Colors.white}
						style={styles.brandIcon}/>
						<Text style={styles.signInText}>
							{this.state.prompt} with Google
						</Text>
					</View>
				</TouchableHighlight>*/}

				<TouchableHighlight
				onPress={this.loginFB}
				underlayColor={Colors.white}>
					<View
					style={[styles.button, styles.facebookButton]}>
						<Icon
						color={Colors.white}
						name='fontawesome|facebook'
						size={28}
						style={styles.brandIcon}/>
						<Text style={styles.signInText}>
							{this.state.prompt} with Facebook
						</Text>
					</View>
				</TouchableHighlight>
				
				<View style={styles.dividerCircle}>
					<Text style={styles.dividerText}>
						Or
					</Text>
				</View>

				<EmailLogin {...this.props} action={this.state.prompt}/>

				<TouchableHighlight
				onPress={this.togglePrompt}
				underlayColor={Colors.white}>
					<Text style={styles.greetText}>
						{this.state.greet}
					</Text>
				</TouchableHighlight>

				<Toast
				isVisible={this.state.status === 'error' || this.state.status === 'success'}
				mode={this.state.status === 'error' ? 'warn' : 'success'}>
	                <TouchableOpacity>
	                    <Text style={styles.toastText}>
	                        {this.toastTitle()}
	                    </Text>
	                </TouchableOpacity>
	            </Toast>
			</View>
		);
    },
});

module.exports = Login;
