var Reflux = require('reflux');

var userActions = [
    'signIn',
    'signOut',
];

var actions = Reflux.createActions(userActions);

module.exports = actions;
