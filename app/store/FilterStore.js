'use strict';

var Reflux = require('reflux'),
    Api = require('../core/Api'),
    FilterActions = require('../actions/FilterActions');

var FilterStore = Reflux.createStore({
    listenables: [FilterActions],

    init() {
        this.state = {
            action: 'not',
            list: null,
        };
    },

    getInitialState() {
        return this.state;
    },

    onClearStore() {
        this.init();
    },

    setList(list) {
        if (list && list.length > 0) {
        	this.state.action  = 'found';
        } else {
            this.state.action = 'none';
        }
        console.log(list);
        this.state.list = list;
    	this.trigger(this.state);
    },

    onFilterList(type, query) {
        fetch(Api.getFilterUrl(type, query))
        .then(response => {
        	if (response.status !== 200) {
        		return null;
        	} else {
                return response.json();
        	}
        })
        .then(list => {
            if (list) {
                var adapted = list.map(raw => Api.adaptListing(type, raw));
                this.setList(adapted);
            } else {
                this.setList(list);
            }
        })
        .done();

        this.state.action = 'searching';
        this.trigger(this.state);
    },
});

module.exports = FilterStore;
