'use strict';

var React = require('react-native'),
    Colors = require('../core/Colors'),
    window = require('Dimensions').get('window');

var {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight,
} = React;

var {
    CONTACT_MESSAGE
} = require('../core/Constants');

var Contact = React.createClass({
    getInitialState() {
        return {
            message: CONTACT_MESSAGE,
        };
    },

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                style={styles.message}
                multiline={true}
                value={CONTACT_MESSAGE}
                onChangeText={message => this.setState({message: message})} />
                <TouchableHighlight
                style={styles.button}
                onPress={this.clicked}
                underlayColor={Colors.brandSecondaryDark}>
                    <Text style={styles.buttonText}>
                        Send
                    </Text>
                </TouchableHighlight>
            </View>
        );
    },

    clicked() {
        console.log('Send to <', this.props.owner, '> Message:', this.state.message);
        this.props.action();
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    promptText: {
        alignSelf: 'flex-start',
    },

    message: {
        height: 120,
        fontSize: 20,
        borderColor: Colors.brandSecondary,
        borderWidth: 1,
        padding: 4,
        borderRadius: 4,
    },

    button: {
        backgroundColor: Colors.brandSecondaryLight,
        borderRadius: 4,
        margin: 8,
        padding: 8,
        width: window.width - 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: Colors.white,
        fontSize: 20,
    },
});

module.exports = Contact;
