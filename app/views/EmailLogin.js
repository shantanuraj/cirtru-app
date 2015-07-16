'use strict';

var React = require('react-native'),
    t = require('tcomb-form-native'),
    Colors = require('../core/Colors'),
    ChangePassword = require('./ChangePassword'),
    UserActions = require('../actions/UserActions');

var window = require('Dimensions').get('window');

var {
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
} = React;

var Form = t.form.Form;

var Email = t.subtype(t.Str, function (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
});

var FormPassword = t.subtype(t.Str, function(e) {
    return e.length >= 8;
});

var LoginPerson = t.struct({
    email: Email,
    password: FormPassword,
});

var RegisterPerson = t.struct({
    email: Email,
    firstName: t.Str,
    password: FormPassword,
});

var options = {
    auto: 'placeholders',
    fields: {
        firstName: {
            error: 'Please enter your first name',
        },
        password: {
            password: true,
            secureTextEntry: true,
            error: 'Please enter a valid password',
        },
        email: {
            error: 'Please enter a valid email',
        },
    },
};

var EmailLogin = React.createClass({
    onPress() {
        var value = this.refs.form.getValue();
        if (!value) {
            return;
        }
        var user = {
            email: value.email,
            firstName: value.firstName,
            password: value.password,
        };

        switch (this.props.action) {
            case 'Sign in': this.doLogin(user); break;
            default: this.doSignUp(user); break;
        }
    },

    doSignUp(user) {
        UserActions.signup(user);
    },

    doLogin(user) {
        UserActions.authenticate(user);
    },

    forgotPassword() {
        this.props.navigator.push({
            title: 'Forgot Password',
            component: ChangePassword,
            passProps: {
                action: 'forgot',
            },
        });
    },

    renderForgotOrNot() {
        if (this.props.action === 'Sign in') {
            return (
                <TouchableOpacity onPress={this.forgotPassword}>
                    <Text style={styles.forgotPassword}>
                        Forgot password? Click here
                    </Text>
                </TouchableOpacity>
            );
        }
    },

    render() {
        return (
            <View style={styles.container}>
                <Form
                  ref='form'
                  type={this.props.action === 'Sign in' ? LoginPerson : RegisterPerson}
                  options={options} />
                {this.renderForgotOrNot()}
                <TouchableHighlight
                onPress={this.onPress}
                underlayColor={Colors.white}>
                    <View
                    style={styles.button}>
                        <Text style={styles.buttonText}>
                            {this.props.action}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: Colors.white,
        width: window.width - 60,
    },

    brandIcon: {
        width: 28,
        height: 28,
        marginLeft: 5,
    },

    button: {
        backgroundColor: Colors.brandSecondary,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 210,
        padding: 5,
        borderRadius: 3,
        marginTop: 30,
        marginBottom: 10,
    },

    buttonText: {
        color: 'white',
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 15,
        padding: 7,
    },

    forgotPassword: {
        color :Colors.brandSecondary,
    },
});

module.exports = EmailLogin;
