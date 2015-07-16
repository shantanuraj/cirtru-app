'use strict';

let React = require('react-native'),
    Reflux = require('reflux'),
    t = require('tcomb-form-native'),
    AutoComplete = require('react-native-autocomplete'),
    Colors = require('../core/Colors'),
    MiniCard = require('./MiniCard'),
    ProductList = require('./ProductList'),
    Toast = require('./util/Toast'),
    DataActions = require('../actions/DataActions'),
    DataStore = require('../store/DataStore'),
    UserActions = require('../actions/UserActions'),
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
    TextInput,
    AlertIOS,
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

    searchBar: {
        height: 41,
        width: 160,
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        borderRadius: 5,
        marginRight: 2,
        padding: 8,
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
    phone: t.maybe(t.Num),
});

let UserEditor = React.createClass({
    mixins: [Reflux.connect(DataStore, 'data'), Reflux.connect(UserStore, 'user'), TimerMixin],

    getInitialState() {
        return {
            editingInfo: false,
            editingWork: true,
            autoCompleteData: [],
        };
    },

    componentDidMount() {
        if (this.state.user.workEmail === '') {
            this.setState({ editingWork: true });
        }
    },

    componentWillMount() {
        DataActions.getCircles();
    },

    editWork() {
        let editingWork = this.state.editingWork;
        this.setState({ editingWork: !editingWork });
        if (this.state.user.workEmail === '') {
            let email = this.state.emailUserName + this.state.emailSuffix;
            UserActions.updateWorkEmail(email);
        }
    },

    editWorkText() {
        if (this.state.user.workEmail === '' || this.state.editingWork) {
            return 'Save';
        } else {
            return 'Edit';
        }
    },

    editInfo() {
        if (!this.state.editingInfo) {
            this.setState({ editingInfo: true });
            return;
        }
        let {
            name,
            phone,
        } = this.refs.personalInfoForm.getValue();
        this.setState({ editingInfo: false });
        UserActions.updateInfo(name, phone);
    },

    editInfoText() {
        if (this.state.editingInfo) {
            return 'Update';
        } else {
            return 'Edit';
        }
    },

    sendVerification() {
        UserActions.resendVerification();
    },

    renderButton(text, action) {
        return (
            <TouchableHighlight
            onPress={action}
            underlayColor={Colors.brandPrimary}
            style={styles.button}>
                <Text style={styles.buttonText}>
                    {text}
                </Text>
            </TouchableHighlight>
        );
    },

    renderEditButtonOrNot() {
        if (!this.state.user.emailVerified) {
            return this.renderButton('Resend Verification', this.sendVerification)
        }
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

    onTyping: function (text) {
        var emails = this.state.data.circleEmails.filter(email => email.indexOf(text) !== -1);
        emails.push(text);
        this.setState({
            autoCompleteData: emails
        });
    },

    onSelect: function(emailSuffix) {
        this.setState({
            emailSuffix: emailSuffix,
            autoCompleteData: [],
        });
    },

    renderEditOrAddWork(options, workValue) {
        let customStyle = {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        };
        console.log(this.state.editingWork);
        if (this.state.user.workEmail !== '' && !this.state.editingWork) {
            return (
                <Form
                ref='workForm'
                type={Work}
                options={options.workOptions}
                value={workValue} />
            );
        } else {
            return (
                <View>
                    <View style={customStyle}>
                        <TextInput
                        autoFocus={true}
                        onChangeText={ emailUserName => this.setState({ emailUserName }) }
                        placeholder={'yourname'}
                        style={styles.searchBar} />

                        <AutoComplete onTyping={this.onTyping}
                        onSelect={this.onSelect}
                        suggestions={this.state.autoCompleteData} />
                    </View>
                    <View style={{marginTop: this.state.autoCompleteData.length ? 120 : 0}} />
                </View>
            );
        }
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
        let options = {
            workOptions: {
                auto: 'placeholders',
                fields: {
                    email: {
                        error: 'Please enter a valid email',
                        editable: false,
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
                        editable: this.state.editingInfo,
                    },
                    phone: {
                        editable: this.state.editingInfo,
                        error: 'Please enter a valid contact number',
                    },
                },
            },
        };
        return (
            <ScrollView
            contentContainerStyle={styles.container}
            contentInset={{top: -65}}>
                <View style={styles.card}>
                    <Text style={styles.cardHeading}>Work/School Email Verification</Text>

                    {this.renderWorkInfo()}

                    {this.renderEditOrAddWork(options, workValue)}
                    
                    {this.renderButton(this.editWorkText(), this.editWork)}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardHeading}>Personal Email Verification</Text>

                    {this.renderPersonalInfo()}

                    <Form
                    ref='personalForm'
                    type={Personal}
                    options={options.personalOptions}
                    value={personalValue} />

                    {this.renderEditButtonOrNot()}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardHeading}>User Information</Text>

                    <Form
                    ref='personalInfoForm'
                    type={PersonalInfo}
                    options={options.personalInfoOptions}
                    value={personalInfoValue} />

                    {this.renderButton(this.editInfoText(), this.editInfo)}
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
