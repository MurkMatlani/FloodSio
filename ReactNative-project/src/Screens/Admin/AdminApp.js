import React from 'react'
import { AdminContextProvider } from '../../Context/AdminContext/AdminContext'
import AdminHome from './AdminHome'
import { createStackNavigator } from '@react-navigation/stack';
import Category from './Category';
import Items from './Items';
import UserViewScreen from './UserViewScreen';
import ResetPassword from '../ResetPassword';
import AllDonation from './AllDonation';
import SingleItemView from './SilngelItemView';

import SystemNavigationBar from 'react-native-system-navigation-bar';
import VictimScreen from './VictimScreen';

const AdminApp = () => {
  SystemNavigationBar.fullScreen(true);
  const Stack = createStackNavigator();

  return (
    <AdminContextProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AdminHome">
        <Stack.Screen name='AdminHome' component={AdminHome} />
        <Stack.Screen name='Category' component={Category} />
        <Stack.Screen name='Item' component={Items} />
        <Stack.Screen name='UserView' component={UserViewScreen} />
        <Stack.Screen name="AllDonation" component={AllDonation} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name='SingleItemView' component={SingleItemView} />
        <Stack.Screen name='Victim' component={VictimScreen} />
      </Stack.Navigator>
    </AdminContextProvider>
  )
}

export default AdminApp

