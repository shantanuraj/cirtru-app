'use strict';

var Reflux = require('reflux');

var profileActions = [
    'filterList',
    'clearStore',
    'hideToast',
    'getOptions',
];

var actions = Reflux.createActions(profileActions);

module.exports = actions;
