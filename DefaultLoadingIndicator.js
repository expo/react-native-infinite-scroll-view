'use strict';

let React = require('react-native');
let {
  ActivityIndicatorIOS,
  Platform,
  ProgressBarAndroid,
  StyleSheet,
  View,
} = React;

class DefaultLoadingIndicator extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {
          Platform.OS === 'android' ?
            <ActivityIndicatorIOS /> :
            <ProgressBarAndroid styleAttr="Small" />
        }
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = DefaultLoadingIndicator;
