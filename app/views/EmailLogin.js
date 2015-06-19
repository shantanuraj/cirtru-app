'use strict';

var React = require('react-native'),
    t = require('tcomb-form-native'),
    validate = t.validate;

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
        if (value) {
            console.log(value);
        }
    },

    render() {
        return (
            <View style={styles.container}>
                <Form
                  ref="form"
                  type={this.props.action === 'Sign in' ? LoginPerson : RegisterPerson}
                  options={options}
                />
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
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
        backgroundColor: '#ffffff',
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
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});


module.exports = EmailLogin;
