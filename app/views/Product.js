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

var Product = React.createClass({
    clicked() {
        console.log('Wooo!');
    },

    render() {
        var data = this.props.data,
            cost = '$' + data.cost,
            image = 'https:' + data.images.thumbs[0];

        return (
        <TouchableHighlight
        underlayColor="transparent" onPress={this.clicked}>
            <View style={styles.row}>
                <Image
                source={{uri: image}}
                style={styles.thumbnail} />

                <View style={styles.info}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.subtitle}>{data.location}</Text>
                    <Text style={styles.subtitle}>{data.circle}</Text>
                    <Text style={styles.subtitle}>{cost}</Text>
                </View>
            </View>
        </TouchableHighlight>
        );
    },
});

module.exports = Product;
