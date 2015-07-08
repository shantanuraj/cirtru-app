'use strict';

var React = require('react-native'),
	t = require('tcomb-form-native'),
    Colors = require('../core/Colors'),
    Toast = require('./util/Toast'),
    UserActions = require('../actions/UserActions'),
	ProfileActions = require('../actions/ProfileActions');

var {
	TouchableHighlight,
    TouchableOpacity,
	StyleSheet,
	Text,
	View
} = React;

var Form = t.form.Form;

var typePassword = t.subtype(t.Str, function(e) {
    return e.length >= 8;
});

var PasswordForm = t.struct({
    currentPassword: typePassword,
    newPassword: typePassword,
    confirmNewPassword: typePassword,
});

var options = {
    fields: {
        currentPassword: {
            password: true,
            secureTextEntry: true,
            error: 'Please enter a valid password',
        },
        newPassword: {
            password: true,
            secureTextEntry: true,
            error: 'Please enter a valid password',
        },
        confirmNewPassword: {
            password: true,
            secureTextEntry: true,
            error: 'Please enter a valid password',
        },
    }
};

var ChangePassword = React.createClass({
	getInitialState() {
		return { error: false };
	},

	render() {
	    return (
	        <View style={styles.container}>
	            <Form
	              ref="form"
	              type={PasswordForm}
	              options={options}
	            />
	            <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor={Colors.brandSecondaryDark}>
	                <Text style={styles.buttonText}>Submit</Text>
	            </TouchableHighlight>

    			<Toast isVisible={this.state.error} mode={'warn'}>
                    <TouchableOpacity>
                        <Text style={styles.toastText}>
                            Passwords do not match
                        </Text>
                    </TouchableOpacity>
                </Toast>
	        </View>
	    );
	},

	onPress() {
		var values = this.refs.form.getValue();
        if (!values || values.newPassword !== values.confirmNewPassword) {
            this.setState({ error: true });
            return;
        }

		var passwords = {
			currentPassword : values.currentPassword,
			verifyPassword  : values.newPassword,
			newPassword     : values.newPassword,
		};
		UserActions.updatePassword(passwords);

        if (this.state.error) {
        	this.setState({error: false})
        }
        this.props.navigator.pop();
	},

	resetPassword() {
		ProfileActions.resetPassword();
		this.props.navigator.pop();
	},
});

var styles = StyleSheet.create({
	container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: Colors.white,
        flex: 1,
    },

    button: {
        height: 36,
        backgroundColor: Colors.brandSecondary,
        borderColor: Colors.brandSecondary,
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

	buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
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

module.exports = ChangePassword;
