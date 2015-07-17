'use strict';

let React = require('react-native');

let {
	StyleSheet,
	ListView,
	Text,
	View,
} = React;

let window = require('Dimensions').get('window');

let styles = {
	listContainer: {
		flex: 1,
	},

	selectableRow: {
		width: window.width,
		padding: 16,
		margin: 2,
	},

    leadText: {
    	fontSize: 16,
    },
};

let MultiPicker = React.createClass({
	renderRow(rowText) {
		return (
			<View style={styles.selectableRow}>
				<Text style={styles.leadText}>
					{rowText}
				</Text>
			</View>
		);
	},
	render() {
		console.log(this.props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return (
			<ListView
			style={styles.listContainer}
			dataSource={dataSource.cloneWithRows(this.props.list)}
			renderRow={row => this.renderRow(row[this.props.accessKey])} />
		);
	},
});

module.exports = MultiPicker;