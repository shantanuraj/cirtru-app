'use strict';

var AsyncStorage = require('react-native').AsyncStorage,
    UserActions = require('../actions/UserActions');

var USER = 'User@';

var LocalStorage = {
    saveUser(user) {
        AsyncStorage.setItem(USER, JSON.stringify(user), error => {
            if (error) {
                console.log('Could not save user');
            }
            UserActions.login(user);
        });
    },

    getUser() {
        AsyncStorage.getItem(USER)
        .then(value => {
            if(value !== null) {
                UserActions.login(JSON.parse(value));
            } else {
                console.log('No user present');
            }
        })
    },

    deleteUser() {
        AsyncStorage.removeItem(USER);
    },
}

module.exports = LocalStorage;
