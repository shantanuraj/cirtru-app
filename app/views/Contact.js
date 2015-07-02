'use strict';

var React = require('react-native'),
    Colors = require('../core/Colors');

var window = require('Dimensions').get('window');

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

var Contact = React.createClass({
    propTypes: {
        action: React.PropTypes.func.isRequired,
    },

    getInitialState() {
        return {
            message: CONTACT_MESSAGE,
        };
    },

    clicked() {
        this.props.action(this.state.message);
    },

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                multiline={true}
                onChangeText={message => this.setState({message: message})}
                style={styles.message}
                value={CONTACT_MESSAGE} />

                <TouchableHighlight
                onPress={this.clicked}
                style={styles.button}
                underlayColor={Colors.brandSecondaryDark}>
                    <Text style={styles.buttonText}>
                        Send
                    </Text>
                </TouchableHighlight>
            </View>
        );
    },
});

module.exports = Contact;
