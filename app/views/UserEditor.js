'use strict';

var React = require('react-native'),
	Reflux = require('reflux'),
	Colors = require('../core/Colors'),
	MiniCard = require('./MiniCard'),
	ProductList = require('./ProductList'),
	Toast = require('./util/Toast'),
	DataActions = require('../actions/DataActions'),
	DataStore = require('../store/DataStore'),
	TimerMixin = require('react-timer-mixin'),
	_ = require('immutable');

var	window = require('Dimensions').get('window');

var {
	ActivityIndicatorIOS,
	TouchableOpacity,
	StyleSheet,
	View,
	Text,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.grey,
	},

	loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundLight,
    },

    loading: {
        margin: 8,
    },

	toastText: {
		color: Colors.white,
		padding: 15,
		backgroundColor: Colors.transparent,
		fontSize: 16,
		fontWeight: 'bold',
		alignSelf: 'center',
    },
});


var UserEditor = React.createClass({
	mixins: [Reflux.connect(DataStore, 'data'), TimerMixin],

	componentWillMount() {
		DataActions.getCircles();
	},

	makeToast(content, visibility, mode) {
		return (
			<Toast isVisible={visibility} mode={mode}>
                <TouchableOpacity>
                    <Text style={styles.toastText}>
                        {content}
                    </Text>
                </TouchableOpacity>
            </Toast>
		);
	},

	renderLoadingView() {
		return (
			<View style={styles.loadingContainer}>
			    <ActivityIndicatorIOS
			    animating={true}
			    color={'#808080'}
			    size={'large'}
			    style={styles.loading} />
			    <Text>
			        Hold on a sec...
			    </Text>
			</View>
		);
	},

	renderLoadedView() {
		return (
			<View style={styles.loadingContainer}>
			    <Text>
			        {this.state.data.circles[0]}
			    </Text>
			</View>
		);
	},

	render() {
		if (!this.state.data || !this.state.data.circles) {
			return this.renderLoadingView();
		} else {
			return this.renderLoadedView();
		}
	},
});

module.exports = UserEditor;
