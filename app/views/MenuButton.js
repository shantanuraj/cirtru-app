'use strict';

var React = require('react-native');

var {
    StyleSheet,
    TouchableHighlight,
    Image
} = React;


var styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 18,
        marginTop: 5,
        marginLeft: 8,
    }
});

var MenuButton = React.createClass({

    action: function() {
        this.props.customAction("toggleMenu");
    },

    render: function() {
        return (
            <TouchableHighlight underlayColor="transparent" onPress={this.action}>
                <Image source={require('image!ic_menu')} style={styles.icon} />
            </TouchableHighlight>
        );
    },
});

module.exports = MenuButton;
