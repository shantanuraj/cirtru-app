'use strict';

var Reflux = require('reflux');

var profileActions = [
    'sendMessage',
    'resetSuccess',
    'resetFail',
    'resetPassword',
    'forgotPassword',
    'resetStore',
];

var actions = Reflux.createActions(profileActions);

module.exports = actions;
