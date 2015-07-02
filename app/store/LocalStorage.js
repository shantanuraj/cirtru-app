'use strict';

var AsyncStorage = require('react-native').AsyncStorage,
    UserActions = require('../actions/UserActions'),
    CookieManager = require('react-native-cookies');

var USER = 'User@';
var COOKIE = 'Cookie@';

var LocalStorage = {
    saveUser(user) {
        CookieManager.getAll((cookies, res) => {
            if (cookies) {
                AsyncStorage.setItem(COOKIE, JSON.stringify(cookies), error => {
                    if (error) {
                        console.log('Cookie not saved');
                    } else {
                        console.log('Cookie cached', cookies);
                    }
                });
            }
        });
        AsyncStorage.setItem(USER, JSON.stringify(user), error => {
            if (error) {
                console.log('Could not save user');
            } else {
                console.log('Saved user');
                UserActions.login(user);
            }
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
        });
        AsyncStorage.getItem(COOKIE)
        .then(value => {
            if (value !== null) {
                CookieManager.getAll((cookies, res) => {
                    if (!cookies['connect.sid']) {
                        this.setCookie(value);
                    }
                });
            }
        });
    },

    setCookie(value) {
        var cookies = JSON.parse(value)['connect.sid'];
        cookies.origin = 'https://cirtru.com';
        cookies.version = 1;
        cookies.expiration = '2017-05-30T12:30:00.00-05:00';

        CookieManager.set(cookies, (extra, res) => {
            if (res === 'success') {
                console.log('Picked from cache', value);
            }
        });
    },

    deleteUser() {
        AsyncStorage.removeItem(USER);
        AsyncStorage.removeItem(COOKIE);
    },
};

module.exports = LocalStorage;
