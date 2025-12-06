import React from 'react';
import { View, StatusBar } from 'react-native';
import PhoneLoginScreen from './PhoneLoginScreen';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <PhoneLoginScreen />
    </View>
  );
}
