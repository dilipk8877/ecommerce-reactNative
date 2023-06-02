import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {emptyCart, getCartItem} from '../../features/productListing/ProductListingSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {displayImageUrl} from '../../utils/ImageUrl';
import StarRating from 'react-native-star-rating';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RazorpayCheckout from 'react-native-razorpay';
const OrderSummary = ({navigation}) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const {isLoader, cartItem} = useSelector(state => state.userProduct);
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

  useEffect(() => {
    dispatch(getCartItem(user?.id));
  }, [user]);

  const calculateTotalPrice = () => {
    let price = 0;
    cartItem?.forEach(item => {
      price += item.product.price * item.product.quantity;
    });
    setTotalPrice(price);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItem]);

  const handlePlaceOrder = () => {
    var options = {
      description: 'Credits towards consultation',
      currency: 'INR',
      key: 'rzp_test_VrEN7BbriCExpP',
      amount: totalPrice * 100,
      name: 'Payments',
      order_id: '', //Replace this with an order_id created using Orders API.
      prefill: {
        contact: '9191919191',
        name: user?.name,
        email:user?.email
      },
      theme: {color: '#ff6600'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
        dispatch(emptyCart(user?.id));
        navigation.navigate("CategoryListing")
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <>
      {false ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <AntDesign
              onPress={() => navigation.openDrawer()}
              name="menuunfold"
              size={30}
              color={'white'}
            />
            <View>
              <Text style={styles.headerText}>Order Summary</Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.shippingDetails}>
              <View style={styles.shippingHeader}>
                <View>
                  <Text style={styles.shippingHeaderText}>Deliver to: </Text>
                </View>
                <View>
                  <Pressable style={styles.shippingButton}>
                    <Text style={styles.shippingButtonText}>Change</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.shippingWrap}>
                <Text style={styles.userName}>Naam</Text>
                <Text style={styles.addresss}>sdfsjbgvbfdjgdfgghfg</Text>
                <Text style={styles.phoneNumber}>65210246858</Text>
              </View>
            </View>
            <View style={{width:"100%",height:"100%"}}>
            <FlashList
              data={cartItem}
              estimatedItemSize={200}
              renderItem={item => {
                return (
                  <TouchableOpacity style={styles.cartProductList}>
                    <View>
                      <Image
                        source={{
                          uri: displayImageUrl + item.item.product.thumbnail,
                        }}
                        style={styles.cartImage}
                      />
                      {/* <Text
                            style={styles.cartRemove}
                            onPress={() =>
                              handleSingleItemRemove(item.item.id)
                            }>
                            Remove
                          </Text> */}
                    </View>
                    <View style={styles.productDetails}>
                      <Text style={styles.cartName}>
                        {item?.item.product?.title}
                      </Text>
                      <View style={styles.counterContainer}>
                        <Text style={styles.counterQuantity}>quantity: {item.item.quantity}</Text>
                        <View style={styles.ratingContainer}>
                          <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={item.item.product.rating}
                            fullStarColor={'green'}
                            starSize={20}
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            </View>
          </ScrollView>
          <View style={styles.bottomConatiner}>
            <View style={styles.cartBottom}>
              <Text style={styles.cartPrice}>
                {' '}
                <FontAwesome name="rupee" size={18} color={'black'} />
                {totalPrice}
              </Text>
              <Pressable
                style={styles.CartPageBottom}
                onPress={() => handlePlaceOrder()}>
                <Text style={styles.CartPagePlace}>Continue</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dfe4ea',
    height: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  headerContainer: {
    height: 50,
    backgroundColor: '#ff6600',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    marginRight: 130,
  },
  shippingDetails: {
    backgroundColor: '#fff',
    height: 'auto',
    padding: 15,
  },
  shippingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shippingHeaderText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 500,
  },
  shippingButton: {
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    borderColor: 'gray',
  },
  shippingButtonText: {
    padding: 2,
    color: '#ff6600',
    fontWeight: 500,
    fontSize: 16,
  },
  shippingWrap: {
    marginTop: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 500,
    color: '#000',
    marginBottom: 5,
  },
  addresss: {
    fontSize: 17,
    fontWeight: 400,
    color: '#000',
  },
  phoneNumber: {
    fontSize: 17,
    fontWeight: 400,
    color: '#000',
    marginTop: 5,
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
  cartImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productDetails: {
    marginLeft: 10,
  },
  cartName: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
  },
  ratingContainer: {
    width: 100,
    marginTop: 5,
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
  bottomConatiner: {
    // marginTop: 15,
    height: 50,
  },
  counterQuantity:{
    fontSize: 18,
    color:"#000"
  }
});
