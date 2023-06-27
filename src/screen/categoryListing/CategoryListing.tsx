import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../features/categoryListing/CategoryListingSlice';

import { FlashList } from '@shopify/flash-list';
import { getProduct } from '../../features/productListing/ProductListingSlice';
import Header from '../../utils/Header';
import { requestUserPermission } from '../../utils/NotificationService';
import messaging from '@react-native-firebase/messaging';
import { AppDispatch, RootState } from '../../../store';
import HomeScreen from '../homeScreen/HomeScreen';


interface CategoryItem {
  name: string;
  _id: string;
}


const CategoryListing = ({ navigation }: any) => {
  const { category, isLoader } = useSelector((state: RootState) => state.userCategory);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const retrieveFCMToken = async () => {
    if (await requestUserPermission()) {
      messaging()
        .getToken()
        .then((fcmToken) => {
          console.log('FCM Token -> ', fcmToken);
        });
    } else {
      console.log('Not Authorization status');
    }
  };
  useEffect(() => {
    retrieveFCMToken()
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const handleProductPage = (id: string) => {
    dispatch(getProduct(id));
    navigation.navigate('ProductListing');
  };

  return (
    <>
      {isLoader ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      ) : (
        <View style={styles.container}>
          <Header headerPageText="Category Page" />
          <View style={styles.mainWrapper}>
            <View style={styles.carouselContainer}>
              <HomeScreen />
            </View>
            <View style={styles.cardContainer}>
              <FlashList
                // horizontal={true}
                data={category}
                estimatedItemSize={200}
                numColumns={2}
                renderItem={({ item }: { item: CategoryItem }) => {
                  return (
                    <TouchableOpacity
                      style={styles.card}
                      onPress={() => {
                        handleProductPage(item?._id);
                      }}>
                      <Image
                        source={{
                          uri: `https://source.unsplash.com/450x300/?${item.name}`,
                        }}
                        style={styles.categoryImage}
                      />
                      <View>
                        <Text style={styles.CategoryDetails}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

          </View>
        </View>
      )}
    </>
  );
};

export default CategoryListing;

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
  cartValue: {
    position: 'absolute',
    right: 4,
    top: 5,
    width: 16,
    height: 17,
    borderRadius: 50,
    backgroundColor: '#ff6600',
    borderColor: '#fff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    marginRight: 18,
  },
  cartItemValue: {
    color: '#fff',
    fontSize: 13,
    top: -2,
    left: 3,
    height: '100%',
    width: '100%',
  },
  mainWrapper:{
    width: '100%',
    height: '100%',
    backgroundColor: '#dfe4ea',
  },
  carouselContainer:{
    width: '100%',
    height: '30%',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    backgroundColor: '#dfe4ea',
    width: '100%',
    height: '15%',
  },
  card: {
    padding: 5,
    width: '95%',
    height: 240,
    backgroundColor: '#f6f6f6',
    margin: 5,
    borderRadius: 5,
  },
  categoryImage: {
    height: 200,
    width: '100%',
  },
  CategoryDetails: {
    color: 'black',
  },
});
