'use strict';

var Reflux = require('reflux');

var userActions = [
    'login',
    'newFacebookSession',
];

var actions = Reflux.createActions(userActions);

module.exports = actions;
