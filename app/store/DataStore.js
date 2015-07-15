'use strict';

var Reflux = require('reflux'),
    Api = require('../core/Api'),
    UserStore = require('../store/UserStore'),
    DataActions = require('../actions/DataActions');

var DataStore = Reflux.createStore({
    listenables: [DataActions],

    init() {
        this.state = null;
    },

    getInitialState() {
        return this.state;
    },

    onGetCircles() {
        fetch(Api.circlesList())
        .then(response => response.json())
        .then(circles => {
            if (!this.state) {
                this.state = {};
            }
            this.state.circles = circles;
            this.trigger(this.state);
        })
        .done();
    }
});

module.exports = DataStore;
