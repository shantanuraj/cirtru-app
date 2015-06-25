'use strict';

var React = require('react-native'),
    Overlay = require('react-native-overlay'),
    Colors = require('../../core/Colors');

var {
  View,
  StyleSheet,
} = React;

var Toast = React.createClass({
    render() {
        var positionStyle;

        return (
            <Overlay isVisible={this.props.isVisible}>
                <View style={styles.bottom}>
                    <View style={styles.content}>
                        {this.props.children}
                    </View>
                </View>
            </Overlay>
        );
    },
});

var styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.brandPrimary,
  },

  content: {
    flex: 9,
  },
})

module.exports = Toast;
