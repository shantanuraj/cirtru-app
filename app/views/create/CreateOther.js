'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    t = require('tcomb-form-native');

var { Icon } = require('react-native-icons');
var {
    SegmentedControlIOS,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} = React;
var Form = t.form.Form;

var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        padding: 8,
        justifyContent: 'center',
    },

    segment: {
        marginBottom: 24,
    },

    button: {
        backgroundColor: Colors.brandSecondaryLight,
        borderRadius: 4,
        padding: 8,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    },

    promptIcon: {
        width: 50,
        height: 50,
        margin: 4,
    },

    promptContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

var OtherItem = t.struct({
    title: t.Str,
    description: t.Str,
    sellingPrice: t.Num,
});

var options = {
    auto: 'placeholders',
    fields: {
        title: {
            error: 'Please add a title',
        },
        description: {
            multiline: true,
            error: 'Please add a description',
        },
        sellingPrice: {
            error: 'Please enter a valid price',
        },
    },
};

var CreateOther = React.createClass({
    propTypes: {
        category: React.PropTypes.string,
    },

    getInitialState() {
        return {
            value: undefined,
            item: {
                status: 'live',
                type: '',
                category: this.props.category,
                title: '',
                description: '',
                sellingPrice: '',
                circle: '',
                primaryLocation: '',
            },
        };
    },

    types: ['Used', 'New'],

    onPress() {
        var value = this.refs.form.getValue();
        if (value) {
            console.log(value);
        }
    },

    onValueChange(value) {
        this.setState({
            value: value,
        });
    },

    addImages() {
        //Stub
    },

    launchCam() {
        //Stub
    },

    render() {
        return (
            <View style={styles.container}>
                <SegmentedControlIOS
                onValueChange={this.onValueChange}
                style={styles.segment}
                tintColor={Colors.brandSecondary}
                values={this.types} />
                <Form
                  options={options}
                  ref='form'
                  type={OtherItem} />

                <View style={styles.promptContainer}>
                    <TouchableOpacity onPress={this.addImages}>
                        <Icon
                        color={Colors.brandSecondary}
                        name='ion|image'
                        size={50}
                        style={styles.promptIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.launchCam}>
                        <Icon
                        color={Colors.brandSecondary}
                        name='ion|ios-camera-outline'
                        size={50}
                        style={styles.promptIcon} />
                    </TouchableOpacity>
                </View>

                <TouchableHighlight onPress={this.onPress} style={styles.button} underlayColor={Colors.brandSecondary}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableHighlight>
            </View>
        );
    },

});

module.exports = CreateOther;
