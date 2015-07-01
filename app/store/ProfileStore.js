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

    onSendMessage(adapted, message) {
        var baseUrl = Api.getListingUrl(adapted.category);

        fetch(baseUrl + adapted.id)
        .then(response => response.json())
        .then(listing => {
            console.log(Api.getContactUrl(adapted.category, adapted.id));
            fetch(Api.getContactUrl(adapted.category, adapted.id), {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Api.getContactPayload(adapted.id, listing, message))
            })
            .then(response => {
                if (response.status === 200) {
                    this.onSuccess();
                } else {
                    this.onFailure();
                }
            })
            .done();
        })
        .done();
    },

    onSuccess() {
        this.state = 'success';
        this.trigger(this.state);
    },

    onFailure() {
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
                this.onSuccess();
            } else {
                this.onFailure();
            }
        })
    },
});

module.exports = ProfileStore;
