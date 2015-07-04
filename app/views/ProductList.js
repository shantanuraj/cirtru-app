'use strict';

var React = require('react-native'),
    Reflux = require('reflux'),
    Api = require('../core/Api'),
    Colors = require('../core/Colors'),
    Product = require('./Product'),
    Search = require('./search/Search'),
    FilterButton = require('./util/FilterButton'),
    FilterActions = require('../actions/FilterActions'),
    FilterStore = require('../store/FilterStore');

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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.grey,
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

    fabContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        borderRadius: 24,
    },
});

var ProductList = React.createClass({
    mixins: [Reflux.connect(FilterStore, 'filterStore')],

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
        this.checkAndRender();
    },

    componentWillUnmount() {
        FilterActions.clearStore();
    },

    checkAndRender() {
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
        .then(response => response.map(raw => Api.adaptListing(type, raw)))
        .then(response => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(response),
                loaded: true,
            });
        })
        .done();
    },

    filter() {
        this.props.navigator.push({
            title: 'Filter',
            component: Search,
            passProps: {
                category: this.props.type,
            },
        });
        this.setState({
            loaded: false,
        });
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

    renderList(list) {
        return (
            <View style={styles.container}>
                <ListView
                dataSource={list}
                renderRow={listing => <Product {...this.props} data={listing} isOwner={this.props.isOwner} style={styles.list} />} />
                <View style={styles.fabContainer}>
                    <FilterButton action={this.filter} />
                </View>
            </View>
        );
    },

    render() {
        if (this.state.filterStore.action === 'found') {
            return this.renderList(this.state.dataSource.cloneWithRows(this.state.filterStore.list));
        }
        if (!this.state.loaded && this.state.filterStore.action === 'none') {
            return this.renderList(this.state.dataSource)
        }
        if (!this.state.loaded || this.state.filterStore.action === 'searching') {
            return this.renderLoadingView();
        }
        return this.renderList(this.state.dataSource);
    },
});

module.exports = ProductList;
