'use strict';

var React = require('react-native'),
    Overlay = require('react-native-overlay'),
    Colors = require('../../core/Colors'),
    _ = require('immutable');

var window = require('Dimensions').get('window');

var {
    ScrollView,
    Text,
    View,
    ListView,
    StyleSheet,
    TouchableHighlight,
} = React;

var styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.brandPrimaryDark,
        paddingTop: 20,
        position: 'absolute',
        top: 0,
        left: 0,
    },

    top: {
        flexDirection: 'row',
        width: window.width,
    },

    content: {
        alignItems: 'center',
        flex: 9,
    },

    button: {
        padding: 12,
        marginBottom: 1,
        backgroundColor: Colors.brandPrimary,
        width: window.width,
    },

    leadText: {
        alignSelf: 'center',
        fontSize: 24,
        padding: 8,
        color: Colors.white,
    },

    rowText: {
        alignSelf: 'center',
        fontSize: 24,
        color: Colors.white,
    }
});

var SinglePicker = React.createClass({
    getInitialState() {
        return {
            list: this.props.list,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    },

    renderRow(row) {
        return (
            <TouchableHighlight
            onPress={() => { this.props.action(row) }}
            style={styles.button}>
                <Text style={styles.rowText}>
                    {row}
                </Text>
            </TouchableHighlight>
        );
    },

    render() {
        return (
            <Overlay isVisible={this.props.isVisible}>
                <ScrollView
                style={styles.container}>
                    <Text style={styles.leadText}>Choose {this.props.label}</Text>
                    <ListView
                    contentContainerStyle={styles.content}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
                    style={styles.top}
                    renderRow={(row) => this.renderRow(row)} />
                </ScrollView>
            </Overlay>
        );
    },
});

module.exports = SinglePicker;
