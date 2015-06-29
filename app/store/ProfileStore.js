'use strict';

var Reflux = require('reflux'),
    Api = require('../core/Api'),
    UserStore = require('../store/UserStore'),
    ProfileActions = require('../actions/ProfileActions');

var ProfileStore = Reflux.createStore({
    listenables: [ProfileActions],

    init() {
        this.state = 'none';
        this.listenTo(UserStore, this.getUser);
    },

    getInitialState() {
        return this.state;
    },

    getUser(userDetails) {
        this.user = userDetails;
    },

    onResetSuccess() {
        this.state = 'success';
        this.trigger(this.state);
    },

    onResetFail() {
        this.state = 'error';
        this.trigger(this.state);
    },

    onResetPassword() {
        fetch(Api.resetPassword(), {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.user.email })
        })
        .then(response => {
            if (response.status === 200) {
                this.onResetSuccess();
            } else {
                this.onResetFail();
            }
        })
    },
});

module.exports = ProfileStore;
