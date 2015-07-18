'use strict';

let React = require('react-native'),
    Api = require('../../core/Api'),
    Colors = require('../../core/Colors'),
    Accordion = require('react-native-accordion'),
    FilterActions = require('../../actions/FilterActions');

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

    selectedOption: {
        backgroundColor: Colors.brandPrimaryDark,
        width: window.width,
        padding: 16,
    },

    headingRow: {
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

let SelectSingle = React.createClass({
    getInitialState() {
        return {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            choices: this.props.choices,
        };
    },

    onDone() {
        FilterActions.setChoices(this.state.choices);
        this.props.navigator.pop();
    },

    renderHeader(row) {
        return (
            <View style={styles.headingRow}>
                <Text style={styles.leadText}>
                    {row}
                </Text>
            </View>
        );
    },

    renderContent(row) {
        let accessKey = null;
        switch(row) {
            case 'Gender': accessKey = 'gender'; break;
            case 'Diet': accessKey = 'diet'; break;
            case 'Smoking': accessKey = 'smoking'; break;
            case 'Drinking': accessKey = 'drinking'; break;
            case 'Pets': accessKey = 'pets'; break;
            case 'Property Type': accessKey = 'type'; break;
            case 'Minimum Rent': accessKey = 'minPrice'; break;
            case 'Maximum Rent': accessKey = 'maxPrice'; break;
        };
        console.log('Row', row, 'Access Key', accessKey);
        let list = this.props.options[accessKey];
        return (
            <ScrollView contentInset={{top: -65}}>
                {list.map((choice, index) => this.renderOptionsRow(choice, index, accessKey))}
            </ScrollView>
        );
    },

    selectOption(index, accessKey) {
        let self = this;
        return () => {
            let state = self.state;
            state.choices[accessKey] = self.props.options[accessKey][index];
            self.setState(state);
        }
    },

    renderOptionsRow(choice, index, accessKey) {
        let customStyle;
        if (this.state.choices[accessKey] && this.state.choices[accessKey] === choice) {
            customStyle = styles.selectedOption;
        } else {
            customStyle = styles.optionsRow;
        }

        return (
            <TouchableHighlight
            key={index}
            onPress={this.selectOption(index, accessKey)}
            style={customStyle}
            underlayColor={Colors.brandPrimaryDark}>
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
                dataSource={this.state.dataSource.cloneWithRows(this.props.list)}
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

module.exports = SelectSingle;