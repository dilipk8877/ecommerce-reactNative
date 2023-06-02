import React from 'react';
import {View} from 'react-native/types';
import LoginPage from '../loginPage/LoginPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupPage from '../signupPage/SignupPage';
const Stack = createNativeStackNavigator();
const AuthApp = () => {
  return (
    <>
      <Stack.Screen
        name="login"
        component={LoginPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupPage"
        component={SignupPage}
        options={{headerShown: false}}
      />
    </>
  );
};

export default AuthApp;
