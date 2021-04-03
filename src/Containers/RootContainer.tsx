/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';

// TODO: Remove from prod
import DemoScreen from '../Screens/Demo/DemoScreen';

class RootContainer extends PureComponent {
  render() {
    return (
      <View style={{height: '100%', width: '100%'}}>
        <SafeAreaView />
        <StatusBar barStyle="dark-content" />
        <DemoScreen />
      </View>
    );
  }
}

export default RootContainer;
