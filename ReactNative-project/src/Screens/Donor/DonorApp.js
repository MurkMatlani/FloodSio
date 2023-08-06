import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { DonorContextProvider } from '../../Context/DonorContext/DonorContext';
import DonorHome from './DonorHome';
import PaymentCardScreen from './PaymentCardScreen';
import TrackOrder from './TrackOrder';
import SingleItemView from './SilngelItemView';
import SellAllItem from './SellAllItem';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import AllDonations from './AllDonations';
import ViewSingleDonation from './ViewSingleDonation';

const DonorApp = () => {
  const Stack = createStackNavigator();
  SystemNavigationBar.fullScreen(true);
    return (
    <DonorContextProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="DonorHome">
        <Stack.Screen name='DonorHome' component={DonorHome} />
        <Stack.Screen name='PaymentScreen' component={PaymentCardScreen} />
        <Stack.Screen name='TrackOrder' component={TrackOrder} />
        <Stack.Screen name='SingleItemView' component={SingleItemView} />
        <Stack.Screen name='SellAllItems' component={SellAllItem} />
        <Stack.Screen name='AllDonations' component={AllDonations}/>
        <Stack.Screen name='ViewDonation' component={ViewSingleDonation}/>



      </Stack.Navigator>
    </DonorContextProvider>
  )
}

export default DonorApp

