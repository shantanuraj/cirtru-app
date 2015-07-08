'use strict';

var React = require('react-native'),
	Icon = require('FAKIconImage'),
	Colors = require('../core/Colors'),
	EmailLogin = require('./EmailLogin'),
	UserActions = require('../actions/UserActions');

var window = require('Dimensions').get('window');

var {
	StyleSheet,
	Text,
	View,
	ScrollView,
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

	signUpText: {
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

	googleButton: {
		backgroundColor: Colors.Google,
	},

	facebookButton: {
		backgroundColor: Colors.Facebook,
	},
});


var Login = React.createClass({
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
            data.greet = 'Already have an account? Click here';
		} else {
			data.prompt = 'Sign in';
			data.greet = 'No account? Click here';
		}
        this.setState(data);
	},

    render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
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

				<EmailLogin action={this.state.prompt} />

				<TouchableHighlight
				onPress={this.togglePrompt}
				underlayColor={Colors.white}>
					<Text style={styles.signUpText}>
						{this.state.greet}
					</Text>
				</TouchableHighlight>
			</ScrollView>
		);
    },
});

module.exports = Login;
