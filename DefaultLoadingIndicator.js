'use strict';

import React from 'react';
import {
  ActivityIndicatorIOS,
  Platform,
  ProgressBarAndroid,
  StyleSheet,
  View,
} from 'react-native';

export default class DefaultLoadingIndicator extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {
          Platform.OS === 'ios' ?
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
