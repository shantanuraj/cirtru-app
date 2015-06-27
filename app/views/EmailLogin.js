'use strict';

var React = require('react-native'),
    t = require('tcomb-form-native'),
    Colors = require('../core/Colors');

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
})

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
    }
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
        var BASE = 'http://localhost:3000'
        fetch(BASE + '/auth/signup', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
          .then(response => console.log(response))
          .done();
    },

    doLogin(user) {
        // fetch(BASE)
    },

    render() {
        return (
            <View style={styles.container}>
                <Form
                  ref="form"
                  type={this.props.action === 'Sign in' ? LoginPerson : RegisterPerson}
                  options={options}
                />
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor={Colors.brandSecondaryDark}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: Colors.white,
        flex: 1,
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
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
    }
});


module.exports = EmailLogin;
