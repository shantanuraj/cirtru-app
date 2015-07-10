'use strict';

var React = require('react-native'),
    Reflux = require('reflux'),
    Api = require('../core/Api'),
    Colors = require('../core/Colors'),
    Product = require('./Product'),
    Search = require('./search/Search'),
    Toast = require('./util/Toast'),
    FabButton = require('./util/FabButton'),
    FilterActions = require('../actions/FilterActions'),
    FilterStore = require('../store/FilterStore'),
    TimerMixin = require('react-timer-mixin');

var {
    ListView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
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

    toastText: {
        color: Colors.white,
        padding: 15,
        backgroundColor: Colors.transparent,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
});

var ProductList = React.createClass({
    mixins: [Reflux.connect(FilterStore, 'filterStore'), TimerMixin],

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

    componentDidUpdate() {
        if (this.state.filterStore.action === 'none') {
            this.setTimeout(FilterActions.hideToast, 1500);
        }
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
            title: 'Search',
            component: Search,
            passProps: {
                category: this.props.type,
                action: this.searchOrNot,
            },
        });
    },

    searchOrNot(queries) {
        if (queries !== '') {
            this.setState({
                loaded: false,
            });
            FilterActions.filterList(this.props.type, queries);
        }
        this.props.navigator.pop();
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

    renderFilterOrNot() {
        if (!this.props.isOwner) {
            return (
                <View style={styles.fabContainer}>
                    <FabButton icon={'fontawesome|filter'} action={this.filter} />
                </View>
            );
        }
    },

    renderList(list) {
        return (
            <View style={styles.container}>
                <ListView
                dataSource={list}
                renderRow={listing => <Product {...this.props} data={listing} isOwner={this.props.isOwner} style={styles.list} />} />
                {this.renderFilterOrNot()}
                {this.makeToast('No matches found', this.state.filterStore.action === 'none', 'warn')}
            </View>
        );
    },

    render() {
        if (this.state.filterStore.action === 'found') {
            return this.renderList(this.state.dataSource.cloneWithRows(this.state.filterStore.list));
        }
        if (this.state.filterStore.action === 'none' || (this.state.filterStore.action === 'not' && this.state.filterStore.list)) {
            return this.renderList(this.state.dataSource)
        }
        if (!this.state.loaded || this.state.filterStore.action === 'searching') {
            return this.renderLoadingView();
        }
        return this.renderList(this.state.dataSource);
    },
});

module.exports = ProductList;
