'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors');

var {
    SegmentedControlIOS,
    Text,
    View,
    StyleSheet
} = React;

var CreateOther = React.createClass({
    getInitialState() {
        return {
            value: undefined,
        };
    },

    types: ['Used', 'New'],

    render() {
        return (
            <View style={styles.container}>
                <SegmentedControlIOS
                tintColor={Colors.brandSecondary}
                values={this.types}
                onValueChange={this._onValueChange} />
            </View>
        );
    },

    _onValueChange(value) {
        this.setState({
            value: value,
        });
    },
});

var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        padding: 8,
    },
});

module.exports = CreateOther;
