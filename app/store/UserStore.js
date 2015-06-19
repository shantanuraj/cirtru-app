'use strict';

var Reflux = require('reflux'),
    UserActions = require('../actions/UserActions'),
    FacebookLoginManager = require('NativeModules').FacebookLoginManager,
    User = require('../models/User'),
    LocalStorage = require('./LocalStorage'),
    AlertIOS = require('react-native').AlertIOS;

var defaultUser = {
    uid: '',
    email: '',
    workEmail: '',
    circle: '',
    medium: '',
    isLoggedIn: false,
    extra: {'fbid' : ''}
};

var UserStore = Reflux.createStore({
    listenables: [UserActions],

    init() {
        LocalStorage.getUser();
        this.state = defaultUser;
    },

    getInitialState() {
        return this.state;
    },

    onLogin(user) {
        this.state = user;
        this.trigger(user);
    },

    onNewFacebookSession() {
        FacebookLoginManager.newSession((error, info) => {
			if (error) {
                AlertIOS.alert('Could not sign in');
			} else {
                info.medium = 'fb';
                User.toUser(info);
			}
		});
    },
});

module.exports = UserStore;
