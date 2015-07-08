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
            data.greet = 'Already a Cirtru member? Please Sign in';
		} else {
			data.prompt = 'Sign in';
			data.greet = 'Don\'t have an account? Sign up';
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
				
				<View style={styles.dividerCircle}>
					<Text style={styles.dividerText}>
						Or
					</Text>
				</View>

				<EmailLogin action={this.state.prompt}/>

				<TouchableHighlight
				onPress={this.togglePrompt}
				underlayColor={Colors.white}>
					<Text style={styles.greetText}>
						{this.state.greet}
					</Text>
				</TouchableHighlight>
			</ScrollView>
		);
    },
});

module.exports = Login;
