'use strict';

var Reflux = require('reflux'),
    UserActions = require('../actions/UserActions'),
    FacebookLoginManager = require('NativeModules').FacebookLoginManager,
    User = require('../models/User'),
    LocalStorage = require('./LocalStorage'),
    AlertIOS = require('react-native').AlertIOS;

var UserStore = Reflux.createStore({
    listenables: [UserActions],

    init() {
        LocalStorage.getUser();
        this.state = User.defaultUser;
    },

    getInitialState() {
        return this.state;
    },

    onLogin(user) {
        this.state = user;
        this.trigger(user);
    },

    onSignup(user) {
        var BASE = 'http://localhost:3000'
        fetch(BASE + '/auth/signup', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
          .then(user => {
              if (!user._id) {
                  AlertIOS.alert('Could not sign up');
              } else {
                  user.medium = 'ci';
                  User.toUser(user);
              }
          })
          .done();
    },

    onNewFacebookSession() {
        FacebookLoginManager.newSession((error, user) => {
			if (error) {
                AlertIOS.alert('Could not sign in');
			} else {
                user.medium = 'fb';
                User.toUser(user);
			}
		});
    },
});

module.exports = UserStore;
