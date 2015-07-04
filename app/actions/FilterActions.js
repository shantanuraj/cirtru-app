'use strict';

var Reflux = require('reflux');

var profileActions = [
    'filterList',
    'clearStore',
    'hideToast',
];

var actions = Reflux.createActions(profileActions);

module.exports = actions;
