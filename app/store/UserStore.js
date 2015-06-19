'use strict';

var Reflux = require('reflux'),
    UserActions = require('../actions/UserActions'),
    FacebookLoginManager = require('NativeModules').FacebookLoginManager,
    User = require('../models/User'),
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
        this.state = {
            prompt: 'Sign in',
			greet: 'No account? Click here',
			result: '',
            user: defaultUser,
        };
    },

    getInitialState() {
        return this.state;
    },

    onLogin(user) {
        this.state.user = user;
        this.state.prompt = '';
        this.state.greet = 'Hello ' +  user.name;
        this.trigger(this.state);
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
