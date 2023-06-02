import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import LoginPage from '../page/loginPage/LoginPage';
import SignupPage from '../page/signupPage/SignupPage';
import BottomNavigator from './bottomNavigator/BottomNavigator';
import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();
const MainStack = () => {
  const [userId, setUser] = useState();
  const {isLogin} = useSelector(state => state.login);
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken?.id);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomNavigation"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      {isLogin ? (
        null
      ) : (
        <>
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignupPage"
            component={SignupPage}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
