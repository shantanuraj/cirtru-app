'use strict';

var React = require('react-native'),
    Colors = require('../core/Colors'),
    Icon = require('FAKIconImage');

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
        height: 250,
        width: window.width,
        tintColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },

    priceContainer: {
        padding: 6,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.6)',
        bottom: 80,
        left: 0,
    },

    infoContainer: {
        padding: 6,
        width: window.width,
        justifyContent: 'space-between',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        bottom: 0,
        left: 0,
    },

    rowText: {
        fontSize: 16,
        fontWeight: '400',
        marginRight: 4,
        color: Colors.white,
    },

    title: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '500',
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
        alignSelf: 'flex-start'
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
            title: this.props.data.title,
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
            title = product.title.length < 35 ?
                    product.title :
                    product.title.slice(0, 35).trim() + '...',
            computedHeight = {
                height: images.pics.length > 0 ? 250 : 175,
            };

        return (
            <TouchableHighlight onPress={this.clicked} underlayColor={Colors.transparent}>
                <View style={[styles.card, computedHeight]}>
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
                            color={Colors.lightGrey}
                            style={styles.mapIcon} />
                            <Text style={styles.rowText}>{product.location}</Text>
                            <Icon
                            name='fontawesome|user'
                            size={20}
                            color={Colors.lightGrey}
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
