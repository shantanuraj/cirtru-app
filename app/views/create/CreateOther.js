'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    t = require('tcomb-form-native'),
    Form = t.form.Form;

var {
    SegmentedControlIOS,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} = React;

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
    }
};

var CreateOther = React.createClass({
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

    render() {
        return (
            <View style={styles.container}>
                <SegmentedControlIOS
                style={styles.segment}
                tintColor={Colors.brandSecondary}
                values={this.types}
                onValueChange={this._onValueChange} />
                <Form
                  ref="form"
                  type={OtherItem}
                  options={options}
                />
                <TouchableOpacity onPress={this.addImages}>
                    <Text style={styles.galleryText}>
                        Add images from Camera Roll
                    </Text>
                </TouchableOpacity>
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor={Colors.brandSecondary}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableHighlight>
            </View>
        );
    },

    addImages() {
        //Stub
    }

    onPress() {
        var value = this.refs.form.getValue();
        if (value) {
            console.log(value);
        }
    },

    _onValueChange(value) {
        this.setState({
            value: value,
        });
    },
});

var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        padding: 8,
    },

    segment: {
        marginBottom: 24,
    },

    button: {
        backgroundColor: Colors.brandSecondaryLight,
        borderRadius: 4,
        margin: 8,
        padding: 8,
        width: window.width - 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },

    galleryText: {
        marginLeft: 8,
        marginBottom: 16,
        color: Colors.brandSecondary,
    },
});

module.exports = CreateOther;
