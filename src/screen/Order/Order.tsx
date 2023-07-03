import { FlashList } from '@shopify/flash-list';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StarRating from 'react-native-star-rating';
import { getOrder } from '../../features/address/CreateOrderSlice';
import { ActivityIndicator } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import Header from '../../utils/Header';
import { AppDispatch, RootState } from '../../../store';
const OrderSection = ({ navigation }: any) => {
  const { orderList, loading } = useSelector((state: RootState) => state.createOrder);
  const { isLogin } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const [userId, setUser] = useState("");
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decodedToken: { id: string } = jwtDecode(token);
      setUser(decodedToken?.id);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    dispatch(getOrder(userId));
  }, [userId]);

  console.log(orderList)
  return (
    <>
      {loading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      ) : (<View style={styles.container}>
        <Header headerPageText="My Orders" navigation={navigation} />
        {isLogin ? (
          <View style={styles.cardContainer}>
            {orderList?.length > 0 ?
              <FlashList
                data={orderList}
                estimatedItemSize={200}
                renderItem={item => {
                  return (
                    <TouchableOpacity style={styles.card}>
                      <View>
                        <Image
                          source={require('../../assets/image/samantha-borges-gXsJ9Ywb5as-unsplash.jpg')}
                          style={styles.orderImage}
                        />
                      </View>
                      <View style={styles.productDetails}>
                        <Text style={styles.deleveredText}>
                          Delivered on May 20
                        </Text>
                        <Text style={styles.productNameText}>Product Name</Text>
                        <View style={styles.ratingContainer}>
                          <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={4}
                            fullStarColor={'green'}
                            starSize={20}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              /> : (<View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No order!</Text>
              </View>)}

          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No order!</Text>
          </View>
        )}
      </View>)}

    </>
  );
};

export default OrderSection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#dfe4ea',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },


  emptyContainer: {
    justifyContent: 'center',
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  emptyText: {
    fontSize: 22,
    color: "#000"

  },
  orderImage: {
    width: 100,
    height: 100,
  },
  deleveredText: {
    color: 'black',
    fontSize: 18,
    fontWeight: "400",
  },
  productDetails: {
    width: '65%',
  },
  cardContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  ratingContainer: {
    width: 100,
    marginTop: 5,
  },
  productNameText: {
    fontSize: 18,
  },
});
