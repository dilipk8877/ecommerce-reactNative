import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../features/categoryListing/CategoryListingSlice';

import { FlashList } from '@shopify/flash-list';
import { getProduct } from '../../features/productListing/ProductListingSlice';


import { AppDispatch, RootState } from '../../../store';


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

 
  const handleProductPage = (id: string) => {
    console.log("object", id);
    dispatch(getProduct(id));
    navigation.navigate('ProductListing');
  };

  return (
    <>
      <FlashList
        horizontal
        data={category}
        estimatedItemSize={200}
        // keyExtractor={(item) => item.id}
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
  mainWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#dfe4ea',
  },
  carouselContainer: {
    width: '95%',
    height: '30%',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    backgroundColor: '#dfe4ea',
    width: '100%',
    height: '100%',
  },
  card: {
    padding: 5,
    width: '95%',
    backgroundColor: '#f6f6f6',
    margin: 5,
    borderRadius: 5,
  },

  categoryImage: {
    height: 100,
    width: 100,
  },

  CategoryDetails: {
    color: 'black',
  },
  middleContainer: {
    height: '18%',
  },
  lowerContainer: {
    // padding: 5,
    marginTop: 25,
    width: '100%',
    height: '100%',
    backgroundColor: "yellow",
  },

  lowerCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flexWrap: 'wrap',
  },
});
