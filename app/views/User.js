'use strict';

var React = require('react-native'),
	Icon = require('FAKIconImage'),
	Colors = require('../core/Colors');

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

	emailButton: {
	    backgroundColor: Colors.brandSecondary,
	},
});

var User = React.createClass({
	getInitialState: function() {
		return {
			prompt: 'Sign in',
			greet: 'No account? Click here',
    	};
  	},

  	togglePrompt: function() {
		if (this.state.prompt === 'Sign in') {
			this.setState({
				prompt: 'Sign up',
				greet: 'Already have an account? Click here',
			})
		} else {
			this.setState({
  			prompt: 'Sign in',
  			greet: 'No account? Click here',
  		});
		}
  	},

	render: function () {
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
	},
});

module.exports = User;
