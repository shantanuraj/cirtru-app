'use strict';

var React = require('react-native'),
	Listings = require('./app/views/Listings');

var {
	AppRegistry,
} = React;

AppRegistry.registerComponent('Trios', () => Listings);
