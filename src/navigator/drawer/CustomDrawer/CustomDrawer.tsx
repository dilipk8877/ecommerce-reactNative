import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
const CustomDrawer = (props:any) => {
  
  const [user, setUser] = useState({});
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decodedToken:{decodedToken:{}} = jwtDecode(token);
      setUser(decodedToken);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  signoutContainer: {
    padding: 10,
  },
  signoutText: {
    fontSize: 20,
  },
});
