import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CategoryListing from '../../screen/categoryListing/CategoryListing';
import ProductListing from '../../screen/ProductListing/ProductListing';
import ProductDeatils from '../../screen/ProductDetails/ProductDeatils';
import Wishlist from '../../screen/wishlist/Wishlist';
import LoginPage from '../../page/loginPage/LoginPage';
import SignupPage from '../../page/signupPage/SignupPage';
import CartPage from '../../screen/cartPage/CartPage';
import ShippingAddress from '../../screen/shippingAddress/ShippingAddress';
import AddAddress from '../../screen/shippingAddress/AddAddress';
import OrderSummary from '../../screen/cartPage/OrderSummary';
const Stack = createNativeStackNavigator();
const Parent = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryListing"
        component={CategoryListing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductListing"
        component={ProductListing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDeatils"
        component={ProductDeatils}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CartPage"
        component={CartPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShippingAddress"
        component={ShippingAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummary}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Parent;
