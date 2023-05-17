import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import CustomDrawer from './CustomDrawer';
import OnBoarding from '../screens/OnBoarding/OnBoarding';
import SignUp from '../screens/Authentication/SignUp';
import SignIn from '../screens/Authentication/SignIn';
import ForgotPassword from '../screens/Authentication/ForgotPassword';
import OTP from '../screens/Authentication/Otp';
import FoodDetail from '../screens/Food/FoodDetail';
import MyCart from '../screens/Cart/MyCart';
import MyCard from '../screens/Card/MyCard';
import AddCard from '../screens/Card/AddCard';
import Checkout from '../screens/Cart/Checkout';
import Success from '../screens/Cart/Success';
import DeliveryStatus from '../screens/Delivery/DeliveryStatus';
import Map from '../screens/Delivery/Map';
import { Home, Splash } from '../screens';



const RootStack = createStackNavigator();

const MainStack = createStackNavigator();

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Splash" component={Splash} />
      <AuthStack.Screen name="Onboarding" component={OnBoarding} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="OTP" component={OTP} />
    </AuthStack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="Home" component={CustomDrawer} />
      <MainStack.Screen name="FoodDetail" component={FoodDetail} />
      <MainStack.Screen name="MyCart" component={MyCart} />
      <MainStack.Screen name="MyCard" component={MyCard} />
      <MainStack.Screen name="AddCard" component={AddCard} />
      <MainStack.Screen name="Checkout" component={Checkout} />
      <MainStack.Screen
        name="Success"
        component={Success}
        options={{ gestureEnabled: false }}
      />
      <MainStack.Screen
        name="DeliveryStatus"
        component={DeliveryStatus}
        options={{ gestureEnabled: false }}
      />
      <MainStack.Screen name="Map" component={Map} />
    </MainStack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Auth">
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="Main" component={MainNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;