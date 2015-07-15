'use strict';

var Reflux = require('reflux');

var dataActions = [
    'getCircles',
];

var actions = Reflux.createActions(dataActions);

module.exports = actions;
