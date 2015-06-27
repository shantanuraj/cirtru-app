'use strict';

var Reflux = require('reflux');

var userActions = [
    'login',
    'signup',
    'authenticate',
    'newFacebookSession',
];

var actions = Reflux.createActions(userActions);

module.exports = actions;
