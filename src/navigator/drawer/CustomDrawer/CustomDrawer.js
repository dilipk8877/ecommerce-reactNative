import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
const CustomDrawer = props => {
  // const {isLogin} = useSelector((state)=>state.isLogin)
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate('LoginPage');
  };
  const handleSignout = async () => {
    await AsyncStorage.clear();
    ToastAndroid.showWithGravity(
      'Logout successfully',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
      );
      navigation.navigate('LoginPage');
  };
  const [user, setUser] = useState();
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
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
      {/* <View style={styles.signoutContainer}>
        {user !== undefined ? (
          <Pressable onPress={handleSignout}>
            <Text style={styles.signoutText}>
              <Entypo name="log-out" size={20} /> Sign out
            </Text>
          </Pressable>
        ) : (
          <Pressable onPress={handleLogin}>
            <Text style={styles.signoutText}>
              <Entypo name="login" size={20} /> Login
            </Text>
          </Pressable>
        )}
      </View> */}
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
