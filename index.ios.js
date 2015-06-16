'use strict';

var React = require('react-native'),
	Listings = require('./app/views/Listings'),
	CardsList = require('./app/views/CardsList'),
	Home = require('./app/views/Home');

var {
	AppRegistry,
} = React;

AppRegistry.registerComponent('Trios', () => Home);
