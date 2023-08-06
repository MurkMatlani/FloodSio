import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { VenderContextProvider } from '../../Context/VenderContaxt/VenderContext';
import VenderHome from './VenderHome';
import TrackOrder from './TrackOrder';
import ResetPassword from '../ResetPassword';

import SystemNavigationBar from 'react-native-system-navigation-bar';
import WalletScreen from './WalletScreen';

const VenderApp = () => {
  SystemNavigationBar.fullScreen(true);
  const Stack = createStackNavigator();

  return (
    <VenderContextProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="VenderHome">
          <Stack.Screen name='VenderHome' component={VenderHome} />
        <Stack.Screen name='TrackOrder' component={TrackOrder} />
        <Stack.Screen name='ResetPassword' component={ResetPassword} />
        <Stack.Screen name='WalletScreen' component={WalletScreen} />


        </Stack.Navigator>
    </VenderContextProvider>
  )
}

export default VenderApp

