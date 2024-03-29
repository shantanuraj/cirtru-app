'use strict';

var React = require('react-native'),
    Colors = require('../core/Colors');

var { Icon } = require('react-native-icons');
var window = require('Dimensions').get('window');

var {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} = React;

var styles = StyleSheet.create({
    card: {
        width: window.width,
        backgroundColor: Colors.placeholder,
        shadowColor: Colors.black,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },

    poster: {
        height: 220,
        width: window.width,
        tintColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },

    priceContainer: {
        paddingLeft: 16,
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 6, 
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        bottom: 100,
        left: 0,
    },

    infoContainer: {
        padding: 16,
        width: window.width,
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
    },

    rowText: {
        fontSize: 16,
        fontWeight: '400',
        marginRight: 4,
    },

    title: {
        fontSize: 20,
        fontWeight: '400',
    },

    cost: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: '500',
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 4,
    },

    noimageContainer: {
        backgroundColor: Colors.placeholder,
        paddingTop: 20,
        height: 150,
        alignItems: 'center',
    },

    mapIcon: {
        width: 20,
        height: 20,
        marginRight: 4,
    },

    userIcon: {
        width: 40,
        height: 20,
        marginRight: 4,
    },

    checkIcon: {
        width: 20,
        height: 20,
        marginTop: 4,
        marginLeft: 15,
        alignSelf: 'flex-start',
        backgroundColor: Colors.transparent,
    },

    nonIcon: {
        width: 100,
        height: 100,
    }
});

var Product = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired,
        isOwner: React.PropTypes.bool,
    },

    clicked() {
        this.props.navigator.push({
            title: 'View',
            component: require('./Listing'),
            passProps: {
                listing: this.props.data,
                isOwner: this.props.isOwner,
            },
        });
    },

    renderImage(images) {
        if (images.pics.length > 0) {
            var image = 'https:' + images.pics[0];
            return (
                <Image source={{uri: image}} style={styles.poster}/>
            );
        } else {
            return (
                <View style={styles.noimageContainer}>
                    <Icon
                    name='fontawesome|home'
                    size={50}
                    color={Colors.placeholderIcon}
                    style={styles.nonIcon} />
                </View>
            );
        }
    },

    render() {
        var product = this.props.data,
            images = product.images,
            cost = '$' + product.cost,
            title = product.title;

        return (
            <TouchableHighlight onPress={this.clicked} underlayColor={Colors.transparent}>
                <View style={[styles.card]}>
					{ this.renderImage(images) }
                    <View style={styles.priceContainer}>
                        <Text style={styles.cost}>{cost}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.row}>
                            <Icon
                            name='fontawesome|map-marker'
                            size={20}
                            color={Colors.grey}
                            style={styles.mapIcon} />
                            <Text style={styles.rowText}>{product.location}</Text>
                            <Icon
                            name='fontawesome|user'
                            size={20}
                            color={Colors.grey}
                            style={styles.userIcon}>
                                <Icon
                                name='fontawesome|check'
                                size={18}
                                color={Colors.verified}
                                style={styles.checkIcon}/>
                            </Icon>
                            <Text style={styles.rowText}>{product.circle}</Text>
                        </View>
                    </View>
                </View>
			</TouchableHighlight>
        );
    },
});

module.exports = Product;
