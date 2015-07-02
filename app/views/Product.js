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
        height: 250,
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

    render() {
        var product = this.props.data,
            cost = '$' + product.cost,
            image = 'https:' + product.images.pics[0],
            title = product.title.length < 22 ?
                product.title :
                product.title.slice(0, 22).trim() + '...';

        return (
            <TouchableHighlight onPress={this.clicked} underlayColor={Colors.transparent}>
                <View style={styles.card}>
					<Image source={{uri: image}} style={styles.poster}/>
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
