'use strict';

var React = require('react-native'),
    Api = require('../core/Api'),
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
    },

    list: {
        flex: 1,
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
});

var ProductList = React.createClass({
    propTypes: {
        isOwner: React.PropTypes.bool,
        list: React.PropTypes.array,
        type: React.PropTypes.string,
    },

    getInitialState() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    },

    componentDidMount() {
        if (this.props.list) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.list),
                loaded: true,
            });
        } else {
            this.fetchData();
        }
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

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
            dataSource={this.state.dataSource}
            renderRow={listing => <Product {...this.props} data={listing} isOwner={this.props.isOwner} style={styles.list} />} />
        );
    },
});

module.exports = ProductList;
