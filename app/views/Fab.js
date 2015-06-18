'use strict';

var React = require('react-native'),
    Colors = require('../core/Colors');

var {
    StyleSheet,
    TouchableHighlight,
    Image
} = React;


var styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32,
    },

    fab: {
        backgroundColor: Colors.brandSecondary,
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
            height: 0,
            width: 0
        },
    },
});

class Fab extends React.Component {
    constructor(props) {
        super(props);
        this.goToAddPage = this.goToAddPage.bind(this);
    }

    goToAddPage() {
        console.log('Touched Fab!');
    }

    render() {
        return (
            <TouchableHighlight
            style={styles.fab}
            underlayColor={Colors.brandSecondary} onPress={this.goToAddPage}>
                <Image source={require('image!ic_add')} style={styles.icon} />
            </TouchableHighlight>
        );
    }
}

module.exports = Fab;
