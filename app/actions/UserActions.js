'use strict';

var Reflux = require('reflux');

var userActions = [
    'login',
    'signup',
    'authenticate',
    'newFacebookSession',
    'updatePassword',
    'updateInfo',
    'updateWorkEmail',
    'resendVerification',
    'logout',
];

var actions = Reflux.createActions(userActions);

module.exports = actions;
