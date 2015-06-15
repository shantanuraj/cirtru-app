'use strict';

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

module.exports = {
	base: 'https://cirtru.com/',
	roommates: function() {
		return this.base + 'api/v1/sfbayarea/roommates';
	},
	movies: function() {
		return REQUEST_URL;
	}
};