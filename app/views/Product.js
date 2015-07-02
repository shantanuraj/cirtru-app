'use strict';

var React = require('react-native'),
    Colors = require('../core/Colors');

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
        backgroundColor: Colors.white,
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

    infoContainer: {
        padding: 6,
        width: window.width,
        justifyContent: 'space-between',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.3)',
        bottom: 0,
        left: 0,
    },

    circle: {
        fontSize: 16,
        fontWeight: '300',
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    noimageContainer: {
        height: 150,
        alignItems: 'center',
    },

    noimage: {
        color: Colors.black,
        fontSize: 18,
        fontWeight: 'bold',
        padding: 8,
        marginTop: 32,
    },
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
                    <Text style={styles.noimage}>
                        No image
                    </Text>
                </View>
            );
        }
    },

    render() {
        var product = this.props.data,
            images = product.images,
            cost = '$' + product.cost,
            title = product.title.length < 22 ?
                product.title :
                product.title.slice(0, 22).trim() + '...',
            computedHeight = {
                height: images.pics.length > 0 ? 250 : 150,
            };

        return (
            <TouchableHighlight onPress={this.clicked} underlayColor={Colors.transparent}>
                <View style={[styles.card, computedHeight]}>
					{ this.renderImage(images) }
                    <View style={styles.infoContainer}>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.circle}>{product.circle}</Text>
                                <Text style={styles.title}>{title}</Text>
                            </View>
                            <Text style={styles.cost}>{cost}</Text>
                        </View>
                    </View>
                </View>
			</TouchableHighlight>
        );
    },
});

module.exports = Product;
