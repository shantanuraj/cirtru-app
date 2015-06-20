'use strict';

var React = require('react-native'),
    Colors = require('../core/Colors');

var {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} = React;

var Product = React.createClass({
    clicked() {
        this.props.navigator.push({
            title: this.props.data.title,
            component: require('./Listing'),
            passProps: {
                listing: this.props.data,
            }
        });
    },

    render() {
        var product = this.props.data,
            cost = '$' + product.cost,
            image = 'https:' + product.images.thumbs[0];

        return (
            <TouchableHighlight
            underlayColor="transparent" onPress={this.clicked}>
                <View style={styles.row}>
                    <Image
                    source={{uri: image}}
                    style={styles.thumbnail} />

                    <View style={styles.info}>
                        <Text style={styles.title}>{product.title}</Text>
                        <Text style={styles.subtitle}>{product.location}</Text>
                        <Text style={styles.subtitle}>{product.circle}</Text>
                        <Text style={styles.subtitle}>{cost}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    },
});

var styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },

    info: {
        flex: 1,
    },

    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },

    subtitle: {
        textAlign: 'center',
        marginBottom: 4,
    },

    thumbnail: {
        width: 120,
        height: 120,
    },
});

module.exports = Product;
