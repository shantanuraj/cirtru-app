'use strict';

let React = require('react-native'),
	Colors = require('../../core/Colors');

let {
	TouchableHighlight,
	ScrollView,
	StyleSheet,
	ListView,
	View,
	Text,
} = React;

let window = require('Dimensions').get('window');

let styles = {
	listContainer: {
		flex: 1,
		backgroundColor: Colors.grey,
	},

	container: {
		backgroundColor: Colors.grey,
	},

	selectedRow: {
		backgroundColor: Colors.brandPrimaryDark,
		width: window.width - 32,
		padding: 16,
	},

	selectableRow: {
		width: window.width,
		padding: 16,
		marginBottom: 1,
	},

    leadText: {
    	fontSize: 16,
    	color: Colors.white,
    },

    buttonContainer: {
    	backgroundColor: Colors.transparent,
		position: 'absolute',
		bottom: 0,
		left: 0,
		height: 70,
		width: window.width,
		padding: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},

	button: {
		width: window.width - 32,
		height: 50,
		padding: 8,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
		backgroundColor: Colors.brandSecondaryLight,
		shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
            height: 0,
            width: 0,
        },
	},

	buttonText: {
		fontSize: 20,
		color: Colors.white,
	},
};

let MultiPicker = React.createClass({
	getInitialState() {
		return {
			dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
			list: this.props.list.map(item => {
				return {
					label: item[this.props.accessKey],
					selected: false,
				}
			}),
			selected: [],
		};
	},

	onPress() {
		this.props.action(this.props.accessKey, this.state.selected);
		this.props.navigator.pop();
	},

	renderRow(row) {
		let rowStyle = row.selected ? styles.selectedRow : styles.selectableRow;
		return (
			<TouchableHighlight
			underlayColor={Colors.brandPrimaryDark}
			style={rowStyle}>
				<Text style={styles.leadText}>
					{row.label}
				</Text>
			</TouchableHighlight>
		);
	},

	render() {
		return (
			<View style={{flex: 1}}>
				<ListView
				style={styles.listContainer}
				contentContainerStyle={styles.container}
				initialListSize={15}
				dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
				renderRow={row => this.renderRow(row)} />

				<View style={styles.buttonContainer}>
					<TouchableHighlight style={styles.button}
					underlayColor={Colors.brandSecondary}
					onPress={this.onPress}>
						<Text style={styles.buttonText}>
							Done
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	},
});

module.exports = MultiPicker;