'use strict';

var React = require('react-native'),
	Listings = require('./app/views/Listings'),
	Home = require('./app/views/Home');

var {
	AppRegistry,
} = React;

AppRegistry.registerComponent('Trios', () => Home);
