'use strict';

var React = require('react-native'),
	Home = require('./app/views/Home');

var {
	AppRegistry,
} = React;

AppRegistry.registerComponent('Trios', () => Home);
