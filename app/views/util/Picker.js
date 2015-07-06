'use strict';

var React = require('react-native'),
    Overlay = require('react-native-overlay'),
    Colors = require('../../core/Colors'),
    Icon = require('FAKIconImage');

var window = require('Dimensions').get('window');

var {
    ScrollView,
    Text,
    View,
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
            selected: [],
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
                <ScrollView
                stickyHeaderIndices={[0]}
                style={styles.container}>
                    <View style={styles.leadContainer}>
                        <Text style={styles.leadText}>Choose {this.props.label}</Text>
                        <TouchableHighlight
                        underlayColor={Colors.transparent}
                        onPress={this.props.action}>
                            <Icon
                            color={Colors.white}
                            name='ion|ios-checkmark-empty'
                            size={40}
                            style={styles.checkMark} />
                        </TouchableHighlight>
                    </View>
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

    leadContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },

    leadText: {
        alignSelf: 'center',
        fontSize: 24,
        color: Colors.white,
    },

    checkMark: {
        width: 40,
        height: 40,
    },

    rowText: {
        alignSelf: 'center',
        fontSize: 24,
        color: Colors.white,
    }
});

module.exports = Picker;
