'use strict';

var Reflux = require('reflux');

var profileActions = [
    'resetSuccess',
    'resetFail',
];

var actions = Reflux.createActions(profileActions);

module.exports = actions;
