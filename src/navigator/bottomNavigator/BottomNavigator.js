import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../../screen/profile/Profile';
import OrderSection from '../../screen/Order/Order';
import CartPage from '../../screen/cartPage/CartPage';
import Feather from 'react-native-vector-icons/Feather';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {getCartItem} from '../../features/productListing/ProductListingSlice';
import Parent from '../Parent/Parent';

const Tab = createBottomTabNavigator();
const BottomNavigator = ({navigation}) => {
  const {isLoader, cartItem} = useSelector(state => state.userProduct);
  const {isLogin} = useSelector(state => state.login);
  const dispatch = useDispatch();
  const [userId, setUser] = useState();
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

  useEffect(() => {
    dispatch(getCartItem(userId));
  }, [userId]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Category"
        component={Parent}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Feather
                name="list"
                size={25}
                onPress={() => navigation.navigate('CategoryListing')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderSection}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Feather name="grid" size={25} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Feather name="user" size={25} />;
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartPage}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <>
                <Feather name="shopping-cart" size={25} />
                <View style={styles.cartValue}>
                  {isLogin ? (
                    <Text style={styles.cartItemValue}>
                      {cartItem && cartItem?.length}
                    </Text>
                  ) : (
                    <Text style={styles.cartItemValue}>0</Text>
                  )}
                </View>
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  cartValue: {
    position: 'absolute',
    right: 22,
    top: -4,
    width: 22,
    height: 23,
    alignItems: 'center',
    borderRadius: 11,
    backgroundColor: '#ff6600',
  },
  cartItemValue: {
    color: '#fff',
    fontSize: 18,
  },
});
