'use strict';

var React = require('react-native');
var window = require('Dimensions').get('window');

var {
	StyleSheet,
	MapView,
	LinkingIOS,
} = React;

var styles = StyleSheet.create({
	mapView: {
		width: window.width,
		height: 300,
	},
});

var MapBox = React.createClass({
	openMaps() {
		var listing = this.props.listing;
		var googBase = 'comgooglemaps://';
		var suffix = '?center=' + listing.coordinates.lat + ',' + listing.coordinates.long;
		suffix += '&zoom=14';
		suffix += '&views=traffic';
		var appleMaps = 'http://maps.apple.com/?ll=' + listing.coordinates.lat + listing.coordinates.long;

		LinkingIOS.canOpenURL(googBase, supported => {
			if (supported) {
				LinkingIOS.openURL(googBase + suffix);
			} else {
				LinkingIOS.openURL(appleMaps);
			}
		});
	},

	render() {
		var listing = this.props.listing;
	    return (
	        <MapView
	        style={styles.mapView}
	        region={{
	            latitude: listing.coordinates.lat,
	            longitude: listing.coordinates.long,
	            latitudeDelta: 0.04,
	            longitudeDelta: 0.04,
	        }}
	        annotations={[{
	            latitude: listing.coordinates.lat,
	            longitude: listing.coordinates.long,
	            title: listing.address,
	            hasRightCallout: true,
	            onRightCalloutPress: this.openMaps,
	            animateDrop: true,
	        }]} />
	    );
	},
});

module.exports = MapBox;