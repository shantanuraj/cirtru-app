'use strict';

let Reflux = require('reflux'),
    UserActions = require('../actions/UserActions'),
    ProfileActions = require('../actions/ProfileActions'),
    Api = require('../core/Api'),
    FacebookLoginManager = require('NativeModules').FacebookLoginManager,
    InstallationManager = require('NativeModules').InstallationManager,
    User = require('../models/User'),
    LocalStorage = require('./LocalStorage'),
    AlertIOS = require('react-native').AlertIOS;

let UserStore = Reflux.createStore({
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
        InstallationManager.subscribeUserToChannel('user-' + user.uid);
    },

    onAuthenticate(user) {
        fetch(Api.login(), {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(user => {
            if (!user._id) {
                AlertIOS.alert('Could not sign in');
            } else {
                user.medium = 'ci';
                User.toUser(user);
            }
        }).done();
    },

    onSignup(user) {
        fetch(Api.signup(), {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(user => {
            if (!user._id) {
                AlertIOS.alert('Could not sign up');
            } else {
                user.medium = 'ci';
                User.toUser(user);
            }
        }).done();
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

    onResendVerification() {
        fetch(Api.reverifyPersonal(), {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.state.email })
        })
        .then(response => {
            if (response.status === 200) {
                console.log(response);
            } else {
                console.log(response);
            }
        })
        .done();
    },

    onUpdateInfo(name, phone) {
        this.state.name = name;
        if (phone) {
            this.state.phone = phone;
        }

        let user = {
            name: name,
            contactNumber: phone,
        };
        
        fetch(Api.updateUser(), {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (response.status === 200) {
                console.log(response);
            } else {
                console.log(response);
            }
        })
        .done();

        this.trigger(this.state);
    },

    onUpdateWorkEmail(workEmail, circle) {
        this.state.workEmail = workEmail;
        this.state.circle = circle;

        console.log('DEBUG:', 'POST =>', Api.updateWorkEmail(), 'DATA =>', {
            workEmail, circle
        });

        fetch(Api.updateWorkEmail(), {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ workEmail, circle }),
        })
        .then(response => {
            if (response.status === 200) {
                console.log(response);
            } else {
                console.log(response);
            }
        })
        .done();        

        this.trigger(this.state);
    },

    onUpdatePassword(passwords) {
        fetch(Api.changePassword(), {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(passwords)
        })
        .then(response => {
            if (response.status === 200) {
                ProfileActions.resetSuccess();
            } else {
                ProfileActions.resetFail();
            }
        })
        .done();
    },

    onLogout() {
        LocalStorage.deleteUser();
        this.state = User.defaultUser;
        this.trigger(this.state);
    },
});

module.exports = UserStore;
