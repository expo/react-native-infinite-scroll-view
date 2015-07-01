/**
 * @flow
 */
'use strict';

let React = require('react-native');
let {
  ActivityIndicatorIOS,
  StyleSheet,
  View,
} = React;

class DefaultLoadingIndicator extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = DefaultLoadingIndicator;
