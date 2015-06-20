'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window');

var {
    StyleSheet,
    ScrollView,
    Image,
} = React;

var Images = React.createClass({
    render() {
        var images = this.props.images.map(image => 'https:' + image);
        return (
            <ScrollView
            style={styles.container}
            horizontal={true}
            contentInset={{top: -65}}>
                {images.map((image, i) => <Image key={i} style={styles.poster} source={{uri: image}}/>)}
            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.grey,
        width: window.width,
        height: 300,
    },
    poster: {
        width: window.width,
        height: 300,
    }
});

module.exports = Images;
