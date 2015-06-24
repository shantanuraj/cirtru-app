'use strict';

var React = require('react-native'),
    Colors = require('../core/Colors'),
    window = require('Dimensions').get('window');

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
            <TouchableHighlight underlayColor="transparent" onPress={this.clicked}>
                <View style={styles.card}>
					<Image style={styles.poster} source={{uri: image}} />
                    <View style={styles.infoContainer}>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.circle}>{product.circle}</Text>
                                <Text style={styles.location}>{product.location}</Text>
                            </View>
                            <Text style={styles.cost}>{cost}</Text>
                        </View>
                    </View>
                </View>
			</TouchableHighlight>
        );
    },
});

var styles = StyleSheet.create({
    card: {
		width: window.width,
		height: 250,
		backgroundColor: '#fff',
		shadowColor: "black",
		shadowOpacity: 0.3,
		shadowRadius: 3,
		shadowOffset: {
			height: 0,
			width: 0
		},
	},

	poster: {
		height: 250,
		width: window.width,
		tintColor: '#FFF',
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

    location: {
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

module.exports = Product;
