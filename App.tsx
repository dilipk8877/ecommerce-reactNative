import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import DrawerNavigator from './src/navigator/drawer/DrawerNavigator';
import {setIslogin} from './src/features/loginSlice/LoginSlice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from './store';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('token');
    if (userToken) {
      dispatch(setIslogin(true));
    } else {
      dispatch(setIslogin(false));
    }
  };
  
  useEffect(() => {
    getToken();
  }, []);

  return (
    <NavigationContainer>
      <DrawerNavigator navigation />
    </NavigationContainer>
  );
};

export default App;
