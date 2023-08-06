import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { RiderContextProvider } from '../../Context/RiderContext/RiderContext'
import RiderHome from './RiderHome'

import SystemNavigationBar from 'react-native-system-navigation-bar';
import ViewSingleDonation from './ViewSingleDonation';

const RiderApp = () => {
  SystemNavigationBar.fullScreen(true);
  const Stack = createStackNavigator();
  return (
    <RiderContextProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="RiderHome">
        <Stack.Screen name='RiderHome' component={RiderHome} />
        <Stack.Screen name='ViewDonation' component={ViewSingleDonation}/>

      </Stack.Navigator>
    </RiderContextProvider>
  )
}

export default RiderApp
