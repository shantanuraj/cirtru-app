/**
 * React Native app demonstrating react-native-icons
 * https://github.com/corymsmith/react-native-icons
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  } = React;

var Icon = require('FAKIconImage'),
	Colors = require('../core/Colors');

var Example = React.createClass({
	getInitialState: function() {
		return {
			prompt: 'Sign in'
    	};
  	},

  	togglePrompt: function() {
  		this.setState({
  			prompt: 'Sign up'
  		});
  	},

  	renderToggler: function() {
  		if (this.state.prompt === 'Sign up') {
  			return (
  				<View />
  			);
  		}
  		return (
  			<TouchableHighlight
  			onPress={this.togglePrompt}
  			underlayColor={Colors.white}>
  				<Text style={styles.signUpText}>
  					No account? Click here
  				</Text>
  			</TouchableHighlight>
  		);
  	},
  
	render: function () {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<TouchableHighlight
				underlayColor={Colors.white}>
					<View
					style={styles.googleButton}>
						<Icon
						name='fontawesome|google'
						size={28}
						color='#ffffff'
						style={styles.brandIcon}/>
						<Text style={styles.signInText}>
							{this.state.prompt} with Google
						</Text>
					</View>
				</TouchableHighlight>

				<TouchableHighlight
				underlayColor={Colors.white}>
					<View
					style={styles.facebookButton}>
						<Icon
						name='fontawesome|facebook'
						size={28}
						color='#ffffff'
						style={styles.brandIcon}/>
						<Text style={styles.signInText}>
							{this.state.prompt} with Facebook
						</Text>
					</View>
				</TouchableHighlight>

				<TouchableHighlight
				underlayColor={Colors.white}>
					<View
					style={styles.emailButton}>
						<Icon
						name='ion|email'
						size={28}
						color='#ffffff'
						style={styles.brandIcon}/>
						<Text style={styles.signInText}>
							{this.state.prompt} with Email
						</Text>
					</View>
				</TouchableHighlight>
			
				{this.renderToggler()}
			</ScrollView>
		);
	},
});

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
  
  googleButton: {
    backgroundColor: Colors.Google,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 210,
    padding: 5,
    borderRadius: 3,
  },
  
  facebookButton: {
    backgroundColor: Colors.Facebook,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 210,
    padding: 5,
    borderRadius: 3,
    marginTop: 10,
  },
  
  emailButton: {
    backgroundColor: Colors.brandSecondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 210,
    padding: 5,
    borderRadius: 3,
    marginTop: 10,
  },
});

module.exports = Example;
