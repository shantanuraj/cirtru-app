var Reflux = require('reflux'),
    UserActions = require('../actions/UserActions'),
    FacebookLoginManager = require('NativeModules').FacebookLoginManager;

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

    onSignIn(user) {
        console.log('Emmited sign in!', user);
        this.trigger({user: defaultUser});
    },

    onTogglePrompt() {
        if (this.state.prompt === 'Sign in') {
            this.state.prompt = 'Sign up';
            this.state.greet =  'Already have an account? Click here';
		} else {
  			this.state.prompt = 'Sign in';
  			this.state.greet = 'No account? Click here';
		}
        this.trigger(this.state);
    },

    onNewFacebookSession() {
        FacebookLoginManager.newSession((error, info) => {
			if (error) {
                this.state.result = error;
			} else {
				this.state.greet = 'You are now logged in.';
				this.state.result = info;
			}
            this.trigger(this.state);
		});
    },
});

module.exports = UserStore;
