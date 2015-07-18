'use strict';

let React = require('react-native'),
    Api = require('../../core/Api'),
    Colors = require('../../core/Colors'),
    Accordion = require('react-native-accordion');

let {
    TouchableHighlight,
    ScrollView,
    StyleSheet,
    ListView,
    View,
    Text,
} = React;

let window = require('Dimensions').get('window');

let styles = {
    listContainer: {
        flex: 1,
        backgroundColor: Colors.grey,
    },

    container: {
        backgroundColor: Colors.grey,
    },

    optionsRow: {
        backgroundColor: Colors.brandSecondary,
        width: window.width,
        padding: 16,
    },

    selectableRow: {
        width: window.width,
        padding: 16,
        marginBottom: 1,
    },

    leadText: {
        fontSize: 16,
        color: Colors.white,
    },

    buttonContainer: {
        backgroundColor: Colors.transparent,
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 70,
        width: window.width,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        width: window.width - 32,
        height: 50,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        backgroundColor: Colors.brandSecondaryLight,
        shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },

    buttonText: {
        fontSize: 20,
        color: Colors.white,
    },
};

let SelectRoommate = React.createClass({
    getInitialState() {
        return {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            list: [
                'Gender',
                'Diet',
                'Smoking',
                'Drinking',
                'Pets',
            ],
            choices: {
                gender: null,
                diet: null,
                drinking: null,
                smoking: null,
                pets: null,
            },
            options: Api.roommatesFilterSet,
        };
    },

    onDone() {
        this.props.action(this.state);
        this.props.navigator.pop();
    },

    renderHeader(row) {
        return (
            <View style={styles.selectableRow}>
                <Text style={styles.leadText}>
                    {row}
                </Text>
            </View>
        );
    },

    renderContent(row) {
        let list = null;
        switch(row) {
            case 'Gender': list = this.state.options.gender; break;
            case 'Diet': list = this.state.options.diet; break;
            case 'Smoking': list = this.state.options.smoking; break;
            case 'Drinking': list = this.state.options.drinking; break;
            case 'Pets': list = this.state.options.pets; break;
        };
        return (
            <ScrollView contentInset={{top: -65}}>
                {list.map((choice, key) => this.renderOptionsRow(choice, key))}
            </ScrollView>
        );
    },

    renderOptionsRow(choice, key) {
        return (
            <TouchableHighlight
            key={key}
            style={styles.optionsRow}
            underlayColor={Colors.brandPrimary}>
                <Text style={styles.leadText}>
                    {choice}
                </Text>
            </TouchableHighlight>
        );
    },

    renderRow(row) {
        return (
            <Accordion
            header={this.renderHeader(row)}
            content={this.renderContent(row)}
            easing='easeOutCubic' />
        );
    },

    render() {
        return (
            <View style={{flex: 1}}>
                <ListView
                style={styles.listContainer}
                contentContainerStyle={styles.container}
                initialListSize={15}
                dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
                renderRow={row => this.renderRow(row)} />

                <View style={styles.buttonContainer}>
                    <TouchableHighlight style={styles.button}
                    underlayColor={Colors.brandSecondary}
                    onPress={this.onDone}>
                        <Text style={styles.buttonText}>
                            Done
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    },
});

module.exports = SelectRoommate;