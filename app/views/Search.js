'use strict';

let React = require('react-native'),
    Reflux = require('reflux'),
    Api = require('../core/Api'),
    Colors = require('../core/Colors'),
    Constants = require('../core/Constants'),
    FabButton = require('./util/FabButton'),
    FilterStore = require('../store/FilterStore'),
    MultiSelect = require('./util/MultiSelect');

let { Icon } = require('react-native-icons');
let {
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
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
                component: MultiSelect,
                passProps: {
                    accessKey: accessKey,
                    list: list,
                    action: this.multiSelectAction,
                },
            })
        };
    },

    multiSelectAction(accessKey, selected) {
        if (!selected || selected.length === 0) {
            return;
        }
        let state = this.state;
        state[accessKey] = selected;
        this.setState(state);
    },

    renderPromptCircle(icon, label, key) {
        return (
            <TouchableHighlight
            style={styles.fabPicker}
            onPress={this.multiPromptAction(label, key)}
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

    renderNonGenericMulti() {

    },

    renderSinglePickers() {
        switch(this.props.category) {
            case 'Roommates': 
            case 'Sublets':
            case 'Cars':
            default: return;
        };
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
                
                <View style={styles.multiSelects}>
                    <View style={styles.row}>
                        {this.renderPromptCircle('ion|map', Constants.LOCATION_LABEL, 'location')}
                        {this.renderPromptCircle('ion|ios-circle-filled', Constants.CIRCLE_LABEL, 'circle')}
                        {this.renderNonGenericMulti()}
                    </View>
                </View>
                
                <View>
                    {this.renderSinglePickers()}
                </View>
                
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