'use strict';

var Reflux = require('reflux'),
    UserActions = require('../actions/UserActions'),
    FacebookLoginManager = require('NativeModules').FacebookLoginManager,
    AlertIOS = require('react-native').AlertIOS;

var defaultUser = {
    uid: '',
    email: '',
    workEmail: '',
    circle: '',
    via: '',
    isLoggedIn: false,
};

var UserStore = Reflux.createStore({
    listenables: [UserActions],

    init() {
        this.user = defaultUser;
        this.state = {
            prompt: 'Sign in',
			greet: 'No account? Click here',
			result: '',
            user: this.user,
        };
    },

    getInitialState() {
        return this.state;
    },

    onNewFacebookSession() {
        FacebookLoginManager.newSession((error, info) => {
			if (error) {
                AlertIOS.alert('Could not sign in');
			} else {
				this.state.greet = 'You are now logged in.';
				this.state.result = info;
			}
            this.trigger(this.state);
		});
    },
});

module.exports = UserStore;
