'use strict';

var Reflux = require('reflux');

var profileActions = [
    'filterList',
    'clearStore',
];

var actions = Reflux.createActions(profileActions);

module.exports = actions;
