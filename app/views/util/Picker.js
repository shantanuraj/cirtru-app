'use strict';

var React = require('react-native'),
    Overlay = require('react-native-overlay'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window');

var {
    ScrollView,
    Text,
    ListView,
    StyleSheet,
    TouchableHighlight,
} = React;

var Picker = React.createClass({
    getInitialState() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    },

    renderRow(row) {
        return (
            <TouchableHighlight
            style={styles.button}
            underlayColor={Colors.brandPrimaryDark}>
                <Text style={styles.rowText}>
                    {row[this.props.label]}
                </Text>
            </TouchableHighlight>
        );
    },

    render() {
        return (
            <Overlay isVisible={this.props.isVisible}>
                <ScrollView style={styles.container}>
                    <Text style={styles.leadText}>Choose {this.props.label}</Text>
                    <ListView
                    contentContainerStyle={styles.content}
                    dataSource={this.state.dataSource.cloneWithRows(this.props.list)}
                    style={styles.top}
                    renderRow={(row) => this.renderRow(row)} />
                </ScrollView>
            </Overlay>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: Colors.brandPrimaryDark,
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
        marginBottom: 20,
        alignSelf: 'center',
        fontSize: 24,
        color: Colors.white,
    },

    rowText: {
        alignSelf: 'center',
        fontSize: 24,
        color: Colors.white,
    }
});

module.exports = Picker;
