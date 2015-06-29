'use strict';

var Reflux = require('reflux');

var profileActions = [
    'resetSuccess',
    'resetFail',
    'resetPassword',
];

var actions = Reflux.createActions(profileActions);

module.exports = actions;
