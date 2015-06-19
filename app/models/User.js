'use strict';

var LocalStorage = require('../store/LocalStorage');

module.exports = {
    toUser(raw) {
        switch (raw.medium) {
            case 'fb' : return this.facebookUser(raw);
            case 'ci' : return this.cirtruUser(raw);
            // case 'go' : return this.GoogleUser(raw);
        }
    },

    facebookUser(raw) {
        var {userId, token} = raw;
        var url = `https://graph.facebook.com/v2.3/${userId}?access_token=${token}` +
                  '&fields=name,email,picture&format=json';

        var normalize = function(user) {
            return {
                name : user.name,
                email : user.email,
                medium : 'facebook',
                extras : {fbid: user.id},
                workEmail: '',
                circle: '',
                isLoggedIn: true,
            };
        };

        fetch(url)
        .then(response => response.json())
        .then(response => normalize(response))
        .then(user => LocalStorage.saveUser(user))
        .done();
    }
};
