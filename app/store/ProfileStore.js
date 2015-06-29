'use strict';

var Reflux = require('reflux'),
    ProfileActions = require('../actions/ProfileActions');

var ProfileStore = Reflux.createStore({
    listenables: [ProfileActions],

    init() {
        this.state = 'none';
    },

    getInitialState() {
        return this.state;
    },

    onResetSuccess() {
        this.state = 'success';
        this.trigger(this.state);
    },

    onResetFail() {
        this.state = 'error';
        this.trigger(this.state);
    },
});

module.exports = ProfileStore;
