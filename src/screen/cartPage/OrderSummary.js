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
import { updateOrder } from '../../features/address/CreateOrderSlice';
import Header from '../../utils/Header';
const OrderSummary = ({navigation}) => {
  const dispatch = useDispatch();
  // const [totalPrice, setTotalPrice] = useState(0);
  const {totalPrice, cartItem} = useSelector(state => state.userProduct);
  const {deliveredAddress,orderId,loading} = useSelector((state) => state.createOrder)
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


  const handlePlaceOrder = () => {
    var options = {
      description: 'Credits towards consultation',
      currency: 'INR',
      key: 'rzp_test_Tiv5oHxAC3kTlH',
      amount: totalPrice * 100,
      name: 'Payments',
      order_id: orderId.razorpayOrderId.id,
      prefill: {
        contact: deliveredAddress?.phone,
        name: deliveredAddress?.fullName,
      },
      theme: {color: '#ff6600'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        dispatch(updateOrder( {
          userId: user?.id,
          address:deliveredAddress,
          totalAmount: totalPrice,
          status: 'pending',
          paymentId: data?.razorpay_payment_id,
          testMode: true
        }))
        dispatch(emptyCart(user?.id));
        navigation.navigate("CategoryListing")
        alert("Payment Successful");
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <>
      {loading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      ) : (
        <>
        <Header headerPageText="Order Summary" />
          <ScrollView>
            <View style={styles.shippingDetails}>
              <View style={styles.shippingHeader}>
                <View>
                  <Text style={styles.shippingHeaderText}>Deliver to: </Text>
                </View>
                <View>
                  <Pressable style={styles.shippingButton} onPress={()=>navigation.navigate("SelectAddress")}>
                    <Text style={styles.shippingButtonText}>Change</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.shippingWrap}>
                <Text style={styles.userName}>{deliveredAddress?.fullName}</Text>
                <Text style={styles.addresss}>{deliveredAddress?.addressLine1}, {deliveredAddress?.addressLine2},</Text>
                <Text style={styles.phoneNumber}>{deliveredAddress?.postalCode}</Text>
                <Text style={styles.phoneNumber}>{deliveredAddress?.phone}</Text>
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
          {orderId &&  <View style={styles.bottomConatiner}>
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
          </View>}
         
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
