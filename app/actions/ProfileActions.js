'use strict';

var Reflux = require('reflux');

var profileActions = [
    'sendMessage',
    'resetSuccess',
    'resetFail',
    'resetPassword',
];

var actions = Reflux.createActions(profileActions);

module.exports = actions;
