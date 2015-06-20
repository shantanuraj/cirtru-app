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

var ProductList = React.createClass({
    getInitialState() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    },

    componentDidMount() {
        this.fetchData();
    },

    fetchData() {
        var type = this.props.type;
        fetch(Api.listings(type))
        .then(response => response.json())
        .then(response => response.filter(listing => listing.images.pics.length > 0))
        .then(response => response.map(raw => Api.adaptListing(type, raw)))
        .then(response => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(response),
              loaded: true,
            });
        })
        .done();
    },

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={listing => <Product {...this.props} data={listing} />}/>
        );
    },

    renderLoadingView() {
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

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundGrey,
    },

    list: {
        flex: 1,
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

module.exports = ProductList;
