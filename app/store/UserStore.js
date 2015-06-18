var Reflux = require('reflux'),
    UserActions = require('../actions/UserActions');

var defaultUser = {
    uid: '',
    email: '',
    workEmail: '',
    circle: '',
    isLoggedIn: false,
};

var UserStore = Reflux.createStore({
    listenables: [UserActions],

    init: function() {
        this.user = defaultUser;
    },

    onSignIn: function (user) {
        console.log('Emmited sign in!', user);
    }
});

module.exports = UserStore;
