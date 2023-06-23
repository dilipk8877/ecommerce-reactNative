import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { logOutUser, setIslogout } from '../../features/loginSlice/LoginSlice';
import Header from '../../utils/Header';

const Profile = ({navigation}) => {
  const navigate = useNavigation();
  const dispatch = useDispatch()
  const [user, setUser] = useState();
  const {isLogin} = useSelector(state => state.login);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken?.name);
    }
  };
  useEffect(() => {
    getToken();
  }, [isLogin]);


  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(setIslogout())
    dispatch(logOutUser())
    navigation.navigate('CategoryListing');
    ToastAndroid.showWithGravity(
      'Logout successfully',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  const handleWishlist = () => {
    navigate.navigate('Wishlist');
  };

  return (
    <View style={styles.container}>
        <Header headerPageText="My Profile" />
      {isLogin  ? (
        <View style={styles.profileSection}>
          <Text style={styles.userName}>Hey! {user}</Text>
          <View
            style={{
              marginTop: 10,
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.containerContent}>
            <Pressable
              style={styles.contentContainer}
              onPress={() => navigation.navigate('Orders')}>
              <Text style={styles.contentText}>My Orders</Text>
              <Feather name="grid" size={20} color={"black"}/>
            </Pressable>
            <Pressable style={styles.contentContainer} onPress={handleWishlist}>
              <Text style={styles.contentText}>My Wishlist</Text>
              <AntDesign name="heart" size={20} style={styles.wishlistIcon} />
            </Pressable>
            <Pressable style={styles.contentContainer} onPress={()=>navigation.navigate("ShippingAddress")}>
              <Text style={styles.contentText}>Shipping Address</Text>
              <FontAwesome5 name="shipping-fast" size={20} color={"black"} />
            </Pressable>
          </View>
          <View style={styles.logoutContainer}>
            <Pressable style={styles.mainLogout} onPress={handleLogout}>
              <Text style={styles.logoutButton}>Logout</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.profileSection}>
          <Text style={styles.accountText}>Account</Text>
          <View>
            <Pressable
              style={styles.button}
              onPress={() =>
                navigation.navigate('LoginPage', {type: 'profilePage'})
              }>
              <Text style={styles.loginText}>
                Log in to get exlusive offers
              </Text>
              <Text style={styles.loginButton}>Login</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#dfe4ea',
  },
  profileSection: {
    backgroundColor: '#fff',
    width: '100%',
    height: '80%',
    borderRadius: 10,
    marginTop: 30,
    padding: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 500,
    color: '#000',
  },
  logoutContainer: {
    padding: 30,
    marginLeft: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  mainLogout: {
    alignItems: 'center',
    backgroundColor: '#ff6600',
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
  },
  logoutButton: {
    fontSize: 18,
    color: '#fff',
  },
  containerContent: {
    padding: 10,
  },
  contentText: {
    fontSize: 18,
    color:"grey",
    fontWeight: 500,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
  },
  wishlistIcon: {
    color: 'red',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  loginButton: {
    backgroundColor: '#ff6600',
    paddingLeft: 15,
    paddingRight: 15,
    padding: 10,
    borderRadius: 5,
    color: 'white',
  },
  accountText: {
    fontSize: 25,
    fontWeight: 500,
  },
  loginText: {
    fontSize: 16,
    color:"#000"
  },
});
