'use strict';

var React = require('react-native'),
    Reflux = require('reflux'),
    Colors = require('../core/Colors'),
    Images = require('./util/Images'),
    Info = require('./util/Info'),
    Amenities = require('./util/Amenities'),
    LocationBox = require('./util/LocationBox'),
    ContactButton = require('./util/ContactButton'),
    Rooms = require('./util/Rooms'),
    SubletInfo = require('./util/SubletInfo'),
    CarInfo = require('./util/CarInfo'),
    Toast = require('./util/Toast'),
    UserStore = require('../store/UserStore'),
    TimerMixin = require('react-timer-mixin'),
    ProfileActions = require('../actions/ProfileActions');

var window = require('Dimensions').get('window');

var {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },

    images: {
        height: 300,
        width: window.width,
    },

    infoContainer: {
        padding: 6,
        width: window.width,
        justifyContent: 'space-between',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.3)',
        top: 260,
        left: 0,
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    circle: {
        fontSize: 16,
        fontWeight: '300',
        color: Colors.white,
    },

    cost: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: '500',
    },

    scroll: {
        backgroundColor: Colors.grey,
    },

    fabContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        borderRadius: 24,
    },

    toastText: {
        color: Colors.white,
        padding: 15,
        backgroundColor: Colors.transparent,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
});


var Listing = React.createClass({
    propTypes: {
        listing: React.propTypes.object.isRequired,
    },

    mixins: [Reflux.connect(UserStore, 'user'), TimerMixin],

    getInitialState() {
        return {
            messageToast: false,
            userToast: false,
            errorToast: false,
        };
    },

    makeToast(content, visibility, mode) {
        return (
            <Toast isVisible={this.state[visibility]} mode={mode}>
                <TouchableOpacity onPress={this.hideToast}>
                    <Text style={styles.toastText}>
                        {content}
                    </Text>
                </TouchableOpacity>
            </Toast>
        );
    },

    showToast(visibility) {
        if (this.state.status === 'error') {
            if (!this.state.user.isLoggedIn) {
                visibility = 'userToast';
            } else {
                visibility = 'errorToast';
            }
        } else {
            visibility = 'messageToast';
        }

        var state = this.state;
        state[visibility] = true;
        this.setState(state);
        this.setTimeout(this.hideToast, 1500);
    },

    hideToast() {
        this.setState({
            messageToast: false,
            userToast: false,
            errorToast: false,
        });
    },

    contactOwner() {
        if (!this.state.user.isLoggedIn) {
            this.showToast('userToast');
		} else {
            this.props.navigator.push({
                title: 'Contact',
                component: require('./Contact'),
                passProps: {
                    owner: this.props.listing.owner,
                    action: this.sendMessage,
                },
            });
        }
    },

    sendMessage(message) {
        this.props.navigator.pop();
        ProfileActions.sendMessage(this.props.listing, message);
    },

    optionalContent() {
        var extras = this.props.listing.data;
        switch (this.props.listing.category) {
            case 'roommates': return (
                <View>
                    <Amenities amenities={extras.amenities} />
                    <Rooms baths={extras.baths} beds={extras.beds} rooms={extras.rooms} />
                </View>
            );
            case 'sublets': return (
                <View>
                    <Amenities amenities={extras.amenities} />
                    <SubletInfo sublet={extras} />
                </View>
            );
            case 'cars': return (
                <CarInfo car={extras} />
            );
        }
    },

    render() {
        var listing = this.props.listing,
            images = listing.images.pics,
            cost = listing.cost,
            info = listing.description,
            circle = listing.circle,
            address = listing.address;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <Images images={images} style={styles.images} />
                    <View style={styles.infoContainer}>
                        <View style={styles.row}>
                            <Text style={styles.circle}>{circle}</Text>
                            <Text style={styles.cost}>${cost}</Text>
                        </View>
                    </View>
                    <LocationBox location={address} />
                    {this.optionalContent()}
                    <Info description={info}/>
                </ScrollView>
                <View style={styles.fabContainer}>
                    <ContactButton action={this.contactOwner} />
                </View>
                {this.makeToast('Message Sent', 'messageToast', 'success')}
                {this.makeToast('You need to login first', 'userToast', 'warn')}
                {this.makeToast('Could not send message', 'errorToast', 'danger')}
            </View>
        );
    },
});

module.exports = Listing;
