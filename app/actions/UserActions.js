var Reflux = require('reflux');

var userActions = [
    'signIn',
    'newFacebookSession',
];

var actions = Reflux.createActions(userActions);

module.exports = actions;
