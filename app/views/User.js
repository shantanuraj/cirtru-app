'use strict';

var React = require('react-native'),
	Icon = require('FAKIconImage'),
	Colors = require('../core/Colors');

var FacebookLoginManager = require('NativeModules').FacebookLoginManager;

var {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableHighlight,
} = React;

class User extends React.Component {
	constructor(props) {
		super(props);

		this.togglePrompt = this.togglePrompt.bind(this);
		this.loginFB = this.loginFB.bind(this);

		this.state =  {
			prompt: 'Sign in',
			greet: 'No account? Click here',
			result: 'Login',
    	};
  	}

  	togglePrompt() {
		if (this.state.prompt === 'Sign in') {
			this.setState({
				prompt: 'Sign up',
				greet: 'Already have an account? Click here',
				result: this.state.result,
			})
		} else {
			this.setState({
  				prompt: 'Sign in',
  				greet: 'No account? Click here',
				result: this.state.result,
  			});
		}
  	}

	loginFB() {
		FacebookLoginManager.newSession((error, info) => {
	      if (error) {
	        this.setState({
				prompt: this.state.prompt,
				greet: this.state.greet,
				result: error,
			});
	      } else {
	        this.setState({
				prompt: this.state.prompt,
				greet: 'You are now logged in.',
				result: info,
			});
	      }
	    });
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<TouchableHighlight
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
				</TouchableHighlight>

				<TouchableHighlight
				onPress={this.loginFB}
				underlayColor={Colors.white}>
					<View
					style={[styles.button, styles.facebookButton]}>
						<Icon
						name='fontawesome|facebook'
						size={28}
						color={Colors.white}
						style={styles.brandIcon}/>
						<Text style={styles.signInText}>
							{this.state.prompt} with Facebook
						</Text>
					</View>
				</TouchableHighlight>

				<TouchableHighlight
				underlayColor={Colors.white}>
					<View
					style={[styles.button, styles.emailButton]}>
						<Icon
						name='ion|email'
						size={28}
						color={Colors.white}
						style={styles.brandIcon}/>
						<Text style={styles.signInText}>
							{this.state.prompt} with Email
						</Text>
					</View>
				</TouchableHighlight>

				<TouchableHighlight
				onPress={this.togglePrompt}
				underlayColor={Colors.white}>
					<Text style={styles.signUpText}>
						{this.state.greet}
					</Text>
				</TouchableHighlight>
			</ScrollView>
		);
	}
}

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

	emailButton: {
	    backgroundColor: Colors.brandSecondary,
	},
});

module.exports = User;
