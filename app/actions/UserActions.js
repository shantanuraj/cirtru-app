'use strict';

var Reflux = require('reflux');

var userActions = [
    'login',
    'signup',
    'authenticate',
    'newFacebookSession',
    'updatePassword',
    'logout',
];

var actions = Reflux.createActions(userActions);

module.exports = actions;
