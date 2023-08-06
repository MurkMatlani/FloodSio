import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { createRef, useContext } from "react";
import { MainAppContext } from './src/Context/MainAppContext';
import AdminApp from "./src/Screens/Admin/AdminApp";
import DonorApp from "./src/Screens/Donor/DonorApp";
import ForgotPassword from "./src/Screens/ForgotPassword";
import Login from "./src/Screens/Login";
import OtpHere from "./src/Screens/OtpHere";
import ProfileScreen from './src/Screens/Profile';
import Register from "./src/Screens/Register";
import ResetPassword from "./src/Screens/ResetPassword";
import RiderApp from "./src/Screens/Rider/RiderApp";
import SplashScreen from './src/Screens/SplashScreen';
import VenderApp from "./src/Screens/Vender/VenderApp";
import { Text, View } from 'react-native';
import VictimScreen from './src/Screens/VictimScree';
import { StatusBar } from 'react-native';

export const NavigationRef = createRef<NavigationContainerRef<any>>();

const App = () => {
  const { isSplash, userType } = useContext(MainAppContext);
  const Stack = createStackNavigator();
  StatusBar.setHidden(true);
  return (
    <>
      {
        isSplash ?
          <SplashScreen /> :
          <NavigationContainer ref={NavigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={
              userType === "" ?
                "Login" : userType == "Vendor" ? "VenderApp" : userType == "Donor" ? "DonorApp" : userType == "Admin" ? "AdminApp" :
                  userType == "Rider" ? "RiderApp" : "VictimScreen"}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="OtpHere" component={OtpHere} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="DonorApp" component={DonorApp} />
              <Stack.Screen name="AdminApp" component={AdminApp} />
              <Stack.Screen name="RiderApp" component={RiderApp} />
              <Stack.Screen name="VenderApp" component={VenderApp} />
              <Stack.Screen name="VictimScreen" component={VictimScreen} />

            </Stack.Navigator>
          </NavigationContainer >
      }
    </>
  )
}




export default App