'use strict';

var React = require('react-native'),
    t = require('tcomb-form-native'),
    Icon = require('FAKIconImage'),
    Colors = require('../core/Colors'),
    UserActions = require('../actions/UserActions');

var window = require('Dimensions').get('window');

var {
    View,
    Text,
    TouchableHighlight,
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

    render() {
        return (
            <View style={styles.container}>
                <Form
                  ref="form"
                  type={this.props.action === 'Sign in' ? LoginPerson : RegisterPerson}
                  options={options}
                />
                <TouchableHighlight
                onPress={this.onPress}
                underlayColor={Colors.white}>
                    <View
                    style={styles.button}>
                        <Icon
                        color={Colors.white}
                        name='ion|email'
                        size={28}
                        style={styles.brandIcon}/>
                        <Text style={styles.buttonText}>
                            {this.props.action} with Email
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        width: window.width - 40,
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
        justifyContent: 'flex-start',
        width: 210,
        padding: 5,
        borderRadius: 3,
        marginBottom: 10,
    },

    buttonText: {
        color: 'white',
        marginLeft: 5,
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 15,
    },
});

module.exports = EmailLogin;
