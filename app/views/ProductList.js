'use strict';

var React = require('react-native'),
    Api = require('../core/Api'),
    Roommate = require('../models/Roommate'),
    Colors = require('../core/Colors'),
    Product = require('./Product');

var {
  ListView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicatorIOS,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundGrey,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundGrey,
  },
  loading: {
    margin: 8,
  },
});

var ProductList = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(Api.roommates())
      .then(response => response.json())
      .then(response => response.filter(listing => listing.images.pics.length > 0))
      .then(response => response.map(raw => Roommate.toRoommate(raw)))
      .then((roommates) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(roommates),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={listing => <Product data={listing} />}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicatorIOS
          style={styles.loading}
          animating={true}
          color={'#808080'}
          size={'large'} />
        
        <Text>
          Hold on a sec...
        </Text>
      </View>
    );
  },
});

module.exports = ProductList;