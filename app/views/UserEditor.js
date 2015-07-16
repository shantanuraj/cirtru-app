'use strict';

let React = require('react-native'),
    Reflux = require('reflux'),
    t = require('tcomb-form-native'),
    Colors = require('../core/Colors'),
    MiniCard = require('./MiniCard'),
    ProductList = require('./ProductList'),
    Toast = require('./util/Toast'),
    DataActions = require('../actions/DataActions'),
    DataStore = require('../store/DataStore'),
    UserStore = require('../store/UserStore'),
    TimerMixin = require('react-timer-mixin');

let window = require('Dimensions').get('window');
let { Icon } = require('react-native-icons');
let {
    ActivityIndicatorIOS,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    View,
    Text,
} = React;

let styles = StyleSheet.create({
    container: {
        marginTop: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 16,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundLight,
    },

    loading: {
        margin: 8,
    },

    card: {
        width: window.width - 16,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        padding: 16,
        marginTop: 16,
    },

    cardHeading: {
        fontSize: 16,
        marginBottom: 16,
    },

    buttonText: {
        color: 'white',
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 16,
    },

    button: {
        backgroundColor: Colors.brandPrimary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 3,
        marginTop: 16,
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.white,
        marginBottom: 16,
    },

    leadText: {
        fontSize: 16,
    },

    userIcon: {
        width: 20,
        height: 20,
        marginRight: 4,
        alignSelf: 'flex-start',
    },

    checkIcon: {
        width: 20,
        height: 20,
        marginTop: 4,
        marginLeft: 2,
        alignSelf: 'flex-start',
        backgroundColor: Colors.transparent,
    },
});

let Form = t.form.Form;

let Email = t.subtype(t.Str, function (email) {
    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
});

let Work = t.struct({
    email: Email,
});

let Personal = t.struct({
    email: Email,    
});

let PersonalInfo = t.struct({
    name: t.Str,
    phone: t.Num,
});

let UserEditor = React.createClass({
    mixins: [Reflux.connect(DataStore, 'data'), Reflux.connect(UserStore, 'user'), TimerMixin],

    getInitialState() {
        return {
            workOptions: { auto: 'placeholders' },
            personalOptions: { auto: 'placeholders' },
            personalInfoOptions: { auto: 'placeholders' },
        };
    },

    componentWillMount() {
        DataActions.getCircles();
    },

    componentDidMount() {
        this.updateOptions();
    },

    updateOptions() {
        this.setState({
            workOptions: {
                auto: 'placeholders',
                fields: {
                    email: {
                        error: 'Please enter a valid email',
                        editable: this.state.user.workEmail === '',
                    },
                },
            },
            personalOptions: {
                auto: 'placeholders',
                fields: {
                    email: {
                        error: 'Please enter a valid email',
                        editable: false,
                    },
                },
            },
            personalInfoOptions: {
                auto: 'placeholders',
                fields: {
                    name: {
                        editable: false,
                    },
                    phone: {
                        editable: false,
                        error: 'Please enter a valid contact number',
                    },
                },
            },
        });
    },

    workEmailState() {
        if (this.state.user.emailVerified) {
            return 'Edit';
        } else {
            return 'Add';
        }
    },

    renderButton(text) {
        return (
            <TouchableHighlight
            underlayColor={Colors.brandPrimary}
            style={styles.button}>
                <Text style={styles.buttonText}>
                    {text}
                </Text>
            </TouchableHighlight>
        );
    },

    renderIconWithText(text, color, icon) {
        let iconName = icon ? icon : 'ion|android-alert';
        let iconColor = color ? color : Colors.warn;
        return (
            <View style={styles.row}>
                <Icon
                name={iconName}
                size={20}
                color={iconColor}
                style={styles.userIcon} />
                <Text style={styles.leadText}>
                    {text}
                </Text>
            </View>
        );
    },

    renderWorkInfo() {
        if (this.state.user.workVerified) {
            return (
                <View>
                    {this.renderIconWithText('Done', Colors.success, 'ion|ios-checkmark')}
                    {this.renderWorkVerified()}
                </View>
            );
        } else if (this.state.user.workEmail == '') {
            return this.renderIconWithText('Required', Colors.danger);
        } else {
            return this.renderIconWithText('Pending');
        }
    },

    renderPersonalInfo() {
        if (this.state.user.emailVerified) {
            return this.renderIconWithText('Done', Colors.success, 'ion|ios-checkmark');
        } else {
            return this.renderIconWithText('Pending');
        }
    },

    renderWorkVerified() {
        return (
            <View style={styles.row}>
                <Icon
                name='fontawesome|user'
                size={20}
                color={Colors.grey}
                style={styles.userIcon}>
                    <Icon
                    name='fontawesome|check'
                    size={18}
                    color={Colors.verified}
                    style={styles.checkIcon} />
                </Icon>
                <Text style={styles.leadText}>
                    Verified user from {this.state.user.circle}
                </Text>
            </View>
        );
    },

    renderLoadingView() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicatorIOS
                animating={true}
                color={'#808080'}
                size={'large'}
                style={styles.loading} />
                <Text>
                    Hold on a sec...
                </Text>
            </View>
        );
    },

    renderLoadedView() {
        let workValue = { email: this.state.user.workEmail };
        let personalValue = {
            email: this.state.user.email,
        };
        let personalInfoValue = {
            name: this.state.user.name,
            phone: this.state.user.phone,
        };
        return (
            <ScrollView
            contentContainerStyle={styles.container}
            contentInset={{top: -65}}>
                <View style={styles.card}>
                    <Text style={styles.cardHeading}>Work/School Email Verification</Text>

                    {this.renderWorkInfo()}

                    <Form
                    ref='workForm'
                    type={Work}
                    options={this.state.workOptions}
                    value={workValue} />
                    
                    {this.renderButton(this.workEmailState())}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardHeading}>Personal Email Verification</Text>

                    {this.renderPersonalInfo()}

                    <Form
                    ref='personalForm'
                    type={Personal}
                    options={this.state.personalOptions}
                    value={personalValue} />

                    {this.renderButton('Edit')}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardHeading}>User Information</Text>

                    <Form
                    ref='personalInfoForm'
                    type={PersonalInfo}
                    options={this.state.personalInfoOptions}
                    value={personalInfoValue} />

                    {this.renderButton('Edit')}
                </View>
            </ScrollView>
        );
    },

    render() {
        if (!this.state.data || !this.state.data.circles) {
            return this.renderLoadingView();
        } else {
            return this.renderLoadedView();
        }
    },
});

module.exports = UserEditor;
