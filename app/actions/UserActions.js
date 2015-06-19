var Reflux = require('reflux');

var userActions = [
    'signIn',
    'togglePrompt',
    'newFacebookSession',
];

var actions = Reflux.createActions(userActions);

module.exports = actions;
