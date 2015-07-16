'use strict';

var React = require('react-native'),
    Reflux = require('reflux'),
    Colors = require('../core/Colors'),
    Images = require('./util/Images'),
    Amenities = require('./util/Amenities'),
    Info = require('./util/Info'),
    FabButton = require('./util/FabButton'),
    FlagButton = require('./util/FlagButton'),
    MapBox = require('./util/MapBox'),
    Rooms = require('./util/Rooms'),
    SubletInfo = require('./util/SubletInfo'),
    CarInfo = require('./util/CarInfo'),
    Toast = require('./util/Toast'),
    ProfileStore = require('../store/ProfileStore'),
    UserStore = require('../store/UserStore'),
    TimerMixin = require('react-timer-mixin'),
    ProfileActions = require('../actions/ProfileActions');

var { Icon } = require('react-native-icons');
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

    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 16,
        paddingTop: 16,
        backgroundColor: Colors.white,
    },

    innerSpacedRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 4,
    },

    leadText: {
        fontSize: 16,
    },

    scroll: {
        backgroundColor: Colors.white,
    },

    mapIcon: {
        width: 20,
        height: 20,
        marginRight: 4,
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

    fabContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        borderRadius: 24,
    },

    button: {
        backgroundColor: Colors.brandPrimaryDark,
        position: 'absolute',
        bottom: 0,
        left: 0,
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
        isOwner: React.PropTypes.bool,
        listing: React.PropTypes.object.isRequired,
    },

    mixins: [Reflux.connect(UserStore, 'user'), Reflux.connect(ProfileStore, 'status'), TimerMixin],

    getInitialState() {
        return { userToast: false };
    },

    makeToast(content, visibility, mode) {
        if(visibility === true) {
            this.setTimeout(this.hideToast, 1500);
        }
        return (
            <Toast isVisible={visibility} mode={mode}>
                <TouchableOpacity onPress={this.hideToast}>
                    <Text style={styles.toastText}>
                        {content}
                    </Text>
                </TouchableOpacity>
            </Toast>
        );
    },

    showToast() {
        this.setState({ userToast: true });
        this.setTimeout(this.hideToast, 1500);
    },

    hideToast() {
        this.setState({
            userToast: false,
            status: 'none',
        });
    },

    contactOwner() {
        if (this.state.user.isLoggedIn) {
            this.props.navigator.push({
                title: 'Contact',
                component: require('./Contact'),
                passProps: {
                    owner: this.props.listing.owner,
                    action: this.sendMessage,
                },
            });
        } else {
            this.showToast();
        }
    },

    sendMessage(message) {
        this.props.navigator.pop();
        ProfileActions.sendMessage(this.props.listing, message);
    },

    fab() {
        if (!this.props.isOwner) {
            return (
                <View style={styles.fabContainer}>
                    <FabButton icon={'ion|email'} action={this.contactOwner} />
                </View>
            );
        }
    },

    optionalContent() {
        var extras = this.props.listing.data;
        switch (this.props.listing.category) {
            case 'roommates': return (
                <Rooms data={extras} />
            );
            case 'sublets': return (
                <View>
                    <SubletInfo sublet={extras} />
                    <Amenities amenities={extras.amenities} />
                </View>
            );
            case 'cars': return (
                <CarInfo car={extras} />
            );
        }
    },

    renderImagesOrNot(images) {
        if (images.length > 0) {
            return (
                <Images images={images} style={styles.images} />
            );
        }
    },

    render() {
        var listing = this.props.listing,
            location = listing.location,
            images = listing.images.pics,
            cost = listing.cost,
            info = listing.description,
            circle = listing.circle,
            address = listing.address;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    {this.renderImagesOrNot(images)}
                    
                    <View style={styles.row}>
                        <Text style={[styles.leadText, {fontWeight: 'bold'}]}>
                            {listing.title}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.innerSpacedRow}>
                            <Icon
                            name='fontawesome|usd'
                            size={20}
                            color={Colors.grey}
                            style={styles.mapIcon} />
                            <Text style={styles.leadText}>{cost}</Text>
                        </View>
                        <View style={styles.innerSpacedRow}>
                            <Icon
                            name='fontawesome|map-marker'
                            size={20}
                            color={Colors.grey}
                            style={styles.mapIcon} />
                            <Text style={styles.leadText}>{location}</Text>
                        </View>
                    </View>
                    
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
                            {circle}
                        </Text>
                    </View>
                    
                    {this.optionalContent()}
                    <Info description={info} />
                    <MapBox listing={listing} />
                </ScrollView>
                {this.fab()}
                {this.makeToast('Message Sent', this.state.status === 'success', 'success')}
                {this.makeToast('Could not send message', this.state.status === 'error', 'danger')}
                {this.makeToast('You need to login first', this.state.userToast, 'warn')}
            </View>
        );
    },
});

module.exports = Listing;
