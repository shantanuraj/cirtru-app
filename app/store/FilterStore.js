'use strict';

var Reflux = require('reflux'),
    Api = require('../core/Api'),
    _ = require('immutable'),
    FilterActions = require('../actions/FilterActions');

var FilterStore = Reflux.createStore({
    listenables: [FilterActions],

    init() {
        this.state = {
            action: 'not',
            list: null,
            options: {},
            choices: {},
        };
    },

    getInitialState() {
        return this.state;
    },

    onClearStore() {
        this.init();
        this.trigger(this.state);
    },

    onHideToast() {
        this.state.action = 'not';
        this.trigger(this.state);
    },

    setList(list) {
        if (list && list.length > 0) {
        	this.state.action  = 'found';
        } else {
            this.state.action = 'none';
        }
        this.state.list = list;
    	this.trigger(this.state);
    },

    onFilterList(type, queries) {
        fetch(Api.getFilterUrl(type, queries))
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

    onGetOptions() {
        Api.categories.forEach(category => {
            fetch(Api.getFilterOptions(category))
            .then(response => response.json())
            .then(options => {
                this.state.options[category] = Api.adaptOptions(options);
            })
            .then(() => {
                var options = _.Map(this.state.options);
                if (options.size === 5) {
                    this.trigger(this.state);
                }
            })
            .done();
        })
    },

    onSetRoommate(roommate) {
        _.Map(roommate)
        .filter(choice => choice !== null)
        .entrySeq().forEach(entry => this.state.choices[entry[0]] = entry[1])
    },
});

module.exports = FilterStore;
