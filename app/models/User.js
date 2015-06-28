'use strict';

var LocalStorage = require('../store/LocalStorage');

module.exports = {
    defaultUser: {
        uid: '',
        name: '',
        medium: '',
        circle: '',
        email: '',
        workEmail: '',
        workVerified: false,
        emailVerified: false,
        isLoggedIn: false,
        extra: {'fbid' : ''},
    },

    toUser(raw) {
        switch (raw.medium) {
            case 'fb' : this.facebookUser(raw); break;
            case 'ci' : this.cirtruUser(raw); break;
            // case 'go' : return this.GoogleUser(raw);
        }
    },

    facebookUser(raw) {
        var {userId, token} = raw;
        var url = `https://graph.facebook.com/v2.3/${userId}?access_token=${token}` +
                  '&fields=name,email,picture&format=json';

        var normalize = function(user) {
            return {
                uid : '',
                name : user.name,
                email : user.email,
                medium : 'facebook',
                circle: '',
                workEmail: '',
                workVerified: false,
                emailVerified: false,
                isLoggedIn: true,
                extras : {fbid: user.id},
            };
        };

        fetch(url)
        .then(response => response.json())
        .then(response => normalize(response))
        .then(user => LocalStorage.saveUser(user))
        .done();
    },

    cirtruUser(raw) {
        var user = {
            uid : raw._id,
            name : (raw.firstName + ' ' + raw.lastName).trim(),
            email : raw.email,
            medium : 'cirtru',
            circle: raw.circle ? raw.circle : '',
            workEmail: raw.workEmail ? raw.workEmail : '',
            workVerified: raw.roles.indexOf('workEmailVerified') != -1,
            emailVerified: raw.roles.indexOf('emailVerified') != -1,
            isLoggedIn: true,
            extras : {roles: raw.roles},
        };

        console.log(user);

        LocalStorage.saveUser(user);
    },
};
