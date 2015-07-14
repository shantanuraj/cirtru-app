'use strict';

var React = require('react-native'),
    Colors = require('../../core/Colors'),
    window = require('Dimensions').get('window');

var {
    Text,
    View,
    StyleSheet
} = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        width: window.width,
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
    },

    subText: {
        fontSize: 16,
    },

    boldText: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },

    col: {
        flex: 1,
        flexDirection: 'column',
    },
});

var CarInfo = React.createClass({
    renderRow(title, value) {
        if (!value) {
            return;
        }
        return (
            <View style={styles.row}>
                <Text style={styles.subText}>{title}</Text>
                <Text style={styles.subText}>{value}</Text>
            </View>
        );
    },

    renderAwesome() {
        var car = this.props.car,
            make = car.make,
            model = car.model,
            subModel = car.subModel,
            year = car.year,
            color = car.color,
            titleStatus = car.titleStatus,
            fuel = car.fuel,
            mileage = car.mileage,
            transmission = car.transmission,
            vin = car.vin;

        return (
            <View style={styles.container}>
                {this.renderRow('Make', make)}
                {this.renderRow('Model', model)}
                {this.renderRow('Sub-Model', subModel)}
                {this.renderRow('Year', year)}
                {this.renderRow('Color', color)}
                {this.renderRow('Title-Status', titleStatus)}
                {this.renderRow('Fuel', fuel)}
                {this.renderRow('Mileage', mileage)}
                {this.renderRow('Transmission', transmission)}
                {this.renderRow('VIN', vin)}
            </View>
        );
    },

    renderCol(title, value) {
        if (!value) {
            return;
        }
        return (
            <View style={styles.col}>
                <Text style={styles.subText}>{title}</Text>
                <Text style={styles.boldText}>{value}</Text>
            </View>
        );
    },

    render() {
        var car = this.props.car,
            make = car.make,
            model = car.model,
            subModel = car.subModel,
            year = car.year,
            color = car.color,
            titleStatus = car.titleStatus,
            fuel = car.fuel,
            mileage = car.mileage,
            transmission = car.transmission,
            vin = car.vin;

        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    {this.renderCol('Year', year)}
                    {this.renderCol('Make', make)}
                    {this.renderCol('Model', model)}
                </View>
                <View style={styles.row}>
                    {this.renderCol('Sub-Model', subModel)}
                </View>
                <View style={styles.row}>
                    {this.renderCol('Color', color)}
                    {this.renderCol('Fuel', fuel)}
                    {this.renderCol('Mileage', mileage)}
                    {this.renderCol('Status', titleStatus)}
                </View>
                <View style={styles.row}>
                    {this.renderCol('Transmission', transmission)}
                    {this.renderCol('VIN', vin)}
                </View>
            </View>
        );
    },
});

module.exports = CarInfo;
