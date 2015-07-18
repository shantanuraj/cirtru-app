'use strict';

let React = require('react-native'),
    Reflux = require('reflux'),
    Api = require('../core/Api'),
    Colors = require('../core/Colors'),
    Constants = require('../core/Constants'),
    FabButton = require('./util/FabButton'),
    FilterStore = require('../store/FilterStore'),
    Select = require('./util/Select'),
    SelectRoommate = require('./util/SelectRoommate');

let { Icon } = require('react-native-icons');
let {
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    View,
    Text,
} = React;

let window = require('Dimensions').get('window');

let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    searchBarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 70,
        width: window.width,
        padding: 16,
        marginTop: 60,
        backgroundColor: Colors.brandSecondaryLighter,
    },

    searchBar: {
        height: 40,
        color: Colors.white,
        borderColor: Colors.transparent,
        borderWidth: 1,
        borderRadius: 3,
        padding: 8,
    },

    multiSelects: {
        position: 'absolute',
        top: 130,
        left: 0,
        padding: 16,
        width: window.width,
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },

    fabPicker: {
        backgroundColor: Colors.brandSecondaryLight,
        width: 108,
        height: 108,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 54,
        justifyContent: 'flex-start',
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },

    fabContent: {
        width: 108,
        height: 108,
        backgroundColor: Colors.transparent,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 8,
    },

    icon: {
        width: 48,
        height: 48,
    },

    subText: {
        fontSize: 16,
        color: Colors.white,
    },

    buttonContainer: {
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
});

let Search = React.createClass({
    mixins: [Reflux.connect(FilterStore, 'filter')],

    singlePromptAction(label, accessKey) {
        let self = this;
        let component = null
        switch(accessKey) {
            case 'roommate': component = SelectRoommate;
            default: component = SelectRoommate;
        };
        return () => {
            self.props.navigator.push({
                title: 'Select ' + label,
                component: component,
            })
        };
    },

    multiPromptAction(label, accessKey) {
        let options = this.state.filter.options[this.props.category];
        let list = null;

        if (this.state[accessKey]) {
            list = this.state[accessKey];
        } else {
            list = options[accessKey].map(item => {
                return {
                    label: item[accessKey],
                    selected: false,
                }
            });
        }

        let self = this;
        return () => {
            self.props.navigator.push({
                title: 'Select ' + label,
                component: Select,
                passProps: {
                    accessKey: accessKey,
                    list: list,
                    action: this.multiSelectAction,
                    mode: Constants.MULTI,
                },
            })
        };
    },

    selectAction(accessKey, selected) {
        if (!selected) {
            return;
        }
        let state = this.state;
        state[accessKey] = selected.label;
        this.setState(state);
    },

    multiSelectAction(accessKey, selected) {
        if (!selected || selected.length === 0) {
            return;
        }
        let state = this.state;
        state[accessKey] = selected;
        this.setState(state);
    },

    renderPromptCircle(icon, label, key, mode) {
        let action;
        if (mode === Constants.MULTI) {
            action = this.multiPromptAction(label, key);
        } else {
            action = this.singlePromptAction(label, key);
        }
        return (
            <TouchableHighlight
            style={styles.fabPicker}
            onPress={action}
            underlayColor={Colors.brandSecondary}>
                <View style={styles.fabContent}>
                    <Icon
                    name={icon}
                    size={32}
                    color={Colors.white}
                    style={styles.icon} />
                    <Text style={styles.subText}>
                        {label}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    },

    render() {
        console.log('State', this.state);
        return (
            <View style={styles.container}>
                <View style={styles.searchBarContainer}>
                    <TextInput
                    autoFocus={true}
                    onChangeText={ searchBox => this.setState({ searchBox }) }
                    placeholderTextColor={Colors.white}
                    placeholder={'Enter keywords'}
                    style={styles.searchBar} />
                </View>
                
                <ScrollView
                contentInset={{top: -65}}
                style={styles.multiSelects}>
                    <View style={styles.row}>
                        {this.renderPromptCircle('ion|map', Constants.LOCATION_LABEL, 'location', Constants.MULTI)}
                        {this.renderPromptCircle('ion|ios-circle-filled', Constants.CIRCLE_LABEL, 'circle', Constants.MULTI)}
                    </View>
                    <View style={styles.row}>
                        {this.renderPromptCircle('ion|ios-home', Constants.PROPERTY_TYPE_LABEL, 'location', Constants.SINGLE)}
                        {this.renderPromptCircle('ion|social-usd', Constants.PRICE_LABEL, 'circle', Constants.SINGLE)}
                    </View>
                    <View style={styles.row}>
                        {this.renderPromptCircle('ion|ios-person', Constants.ROOMMATE_LABEL, 'roommate', Constants.SINGLE)}
                    </View>
                </ScrollView>
                
                <View style={styles.buttonContainer}>
                    <TouchableHighlight style={styles.button}
                    underlayColor={Colors.brandSecondary}
                    onPress={this.props.action}>
                        <Text style={styles.buttonText}>
                            Search
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    },
});

module.exports = Search;