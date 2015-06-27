'use strict';

var Reflux = require('reflux');

var userActions = [
    'login',
    'signup',
    'authenticate',
    'newFacebookSession',
    'logout',
];

var actions = Reflux.createActions(userActions);

module.exports = actions;
