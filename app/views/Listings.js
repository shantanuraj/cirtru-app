'use strict';

var React = require('react-native'),
	Router = require('react-native-router'),
	SideMenu = require('react-native-side-menu'),
	Colors = require('../core/Colors'),
	MenuButton = require('./MenuButton'),
	Menu = require('./Menu'),
	Fab = require('./Fab'),
	ProductList = require('./ProductList');

var {
	View,
	Text,
	StyleSheet,
} = React;

var styles = StyleSheet.create({
  navbar: {
    backgroundColor: Colors.brandPrimary,
  },
  fabContainer: {
  	position: 'absolute',
  	bottom: 16,
  	right: 16,
  	borderRadius: 24,
  },
});

var firstRoute = {
  name: 'Cirtru',
  component: ProductList,
  leftCorner: MenuButton,
};

var Content = React.createClass({
	render: function() {
		return (
			<Router
	          customAction={this.press}
	          headerStyle={styles.navbar}
	          firstRoute={firstRoute}
	        />
		);
	}, 
	press: function(message) {
		this.props.menuActions.toggle();
	}
});

var Listings = React.createClass({

  render: function() {
  	var menu = <Menu navigator={navigator}/>;
    return (
      <SideMenu
          menu={menu}
          touchToClose={true}>
        <Content />
        <View style={styles.fabContainer}>
			<Fab />
		</View>
      </SideMenu> 
    );
  },
});

module.exports = Listings;
