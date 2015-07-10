module.exports = {
	base: 'https://accounts.google.com/o/oauth2/auth?response_type=code&',
	redirect_uri : 'cirtru://auth&',
	scope: 'scope=email&,'
	client_id: 'client_id=648230858722-jv3br2jo8o7b4kutn5tsnnfg3svsb145.apps.googleusercontent.com&',
	url() {
		return this.base + this.redirect_uri + this.scope + this.client_id;
	}
};