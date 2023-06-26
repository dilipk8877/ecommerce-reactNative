import jwtDecode from 'jwt-decode';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  emptyCart,
  getCartItem,
  getProductDetails,
  incrementItemInCart,
  removeSingleProduct,
  setTotalPrices,
} from '../../features/productListing/ProductListingSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlashList} from '@shopify/flash-list';
import UserNotLogin from './UserNotLogin';
import {displayImageUrl} from '../../utils/ImageUrl';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../../utils/Header';
import { CartImage } from '../../assets';
const CartPage = ({navigation}) => {
  const {isLoader, cartItem} = useSelector(state => state.userProduct);
  const {isLogin} = useSelector(state => state.login);
  const [totalPrice, setTotalPrice] = useState(0);
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


  useEffect(() => {
    calculateTotalPrice();
  }, [cartItem]);

  const calculateTotalPrice = () => {
    let price = 0;
    cartItem?.forEach(item => {
      price += item.product.price * item.product.quantity;
    });
    setTotalPrice(price);
  };

  const handleSingleItemRemove = id => {
    dispatch(removeSingleProduct({id, userId}));
  };

  const handleOpenProductDetail = id => {
    dispatch(getProductDetails(id));
    navigation.navigate('ProductDeatils');
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart(userId));
  };

  const handlePlaceOrder = () => {
    dispatch(setTotalPrices(totalPrice))
    navigation.navigate('SelectAddress');

  };

  const handleIncrementItem = data => {
    dispatch(
      incrementItemInCart({id:data.id, quantity:data.quantity +1,userId}),
    );
  };

  const handleDecrementItem = data => {
    dispatch(
      incrementItemInCart({id:data.id, quantity:data.quantity -1,userId}),
    );
  };
  return (
    <>
      {isLoader ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      ) : (
        <View style={styles.container}>
        <Header headerPageText="Your Cart" />
          {isLogin ? (
            <>
              {cartItem?.length > 0 ? (
                <View style={styles.emptyButtonContainer}>
                  <Pressable
                    style={styles.emptyButton}
                    onPress={() => handleEmptyCart()}>
                    <Text style={styles.emptyButtonText}>Empty cart</Text>
                  </Pressable>
                </View>
              ) : null}
              {cartItem?.length > 0 ? (
                <FlashList
                  data={cartItem}
                  estimatedItemSize={200}
                  renderItem={item => {
                    return (
                      <TouchableOpacity
                        style={styles.cartProductList}
                        // onPress={() => handleOpenProductDetail(item.item.id)}
                      >
                        <View>
                          <Image
                            source={{
                              uri:
                                displayImageUrl + item.item.product.thumbnail,
                            }}
                            style={styles.cartImage}
                          />
                          <Text
                            style={styles.cartRemove}
                            onPress={() =>
                              handleSingleItemRemove(item.item.id)
                            }>
                            Remove
                          </Text>
                        </View>
                        <View style={styles.productDetails}>
                          <Text style={styles.cartName}>
                            {item?.item.product?.title}
                          </Text>
                          <View style={styles.counterContainer}>
                            <Pressable style={styles.IncDecIcon}>
                              <Text
                                style={styles.IncDecIconText}
                                onPress={() =>
                                  handleDecrementItem({
                                    id: item.item.id,
                                    quantity: item.item.quantity,
                                  })
                                }>
                                -
                              </Text>
                            </Pressable>
                            <View style={styles.cartInput}>
                              <Text style={{fontSize: 18, color: 'black'}}>
                                {item?.item?.product?.quantity}
                              </Text>
                            </View>
                            <Pressable style={styles.IncDecIcon}>
                              <Text
                                style={styles.IncDecIconText}
                                onPress={() =>
                                  handleIncrementItem({
                                    id: item.item.id,
                                    quantity: item.item.quantity,
                                  })
                                }>
                                +
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              ) : (
                <View style={styles.emptyCart}>
                  {/* <Image
                    source={require('../../assets/image/png-transparent-empty-cart-illustration-thumbnail-removebg-preview.png')}
                    style={styles.CartImage}
                  /> */}
                  <CartImage  style={styles.CartImage}/>
                  <Text style={styles.emptyCartText}>Your Cart is Empty</Text>
                  <Text
                    style={styles.emptyCartLink}
                    onPress={() => navigation.navigate('CategoryListing')}>
                    Continue to shopping
                  </Text>
                </View>
              )}

              <View style={{height: 53}}></View>
              {cartItem?.length > 0 ? (
                <View style={styles.cartBottom}>
                  <Text style={styles.cartPrice}>
                    {' '}
                    <FontAwesome name="rupee" size={18} color={'black'} />
                    {totalPrice}
                  </Text>
                  <Pressable
                    style={styles.CartPageBottom}
                    onPress={() => handlePlaceOrder()}>
                    <Text style={styles.CartPagePlace}>Place Order</Text>
                  </Pressable>
                </View>
              ) : null}
            </>
          ) : (
            <UserNotLogin navigation={navigation} />
          )}
        </View>
      )}
    </>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dfe4ea',
    height: '100%',
  },
  emptyCartText: {
    fontSize: 25,
    color: 'black',
  },

  emptyCartLink: {
    color: '#4285F4',
    fontSize: 18,
  },
  emptyCart: {
    alignItems: 'center',
  },
  CartImage: {
    width: '100%',
    height: 300,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 8,
    padding: 3,
    width: 36,
    color: '#a5a1a1',
  },
  productDetails: {
    marginLeft: 10,
  },

  cartBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  cartProductList: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5,
    // marginBottom:50
  },
  cartPrice: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    padding: 5,
  },
  CartPageBottom: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6600',
    height: 40,
    marginRight: 9,
  },
  CartPagePlace: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '400',
  },
  cartImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cartName: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
  },
  cartRemove: {
    color: '#e24444',
    fontSize: 18,
    fontWeight: '500',
  },
  counterContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  IncDecIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ff6600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  IncDecIconText: {
    position: 'absolute',
    bottom: -6,
    fontSize: 30,
    color: '#fff',
  },
  cartInput: {
    backgroundColor: '#cfcece',
    height: 25,
    width: 25,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  emptyButton: {
    width: 100,
    height: 40,
    backgroundColor: '#FF6600',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
