import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import StarRating from 'react-native-star-rating';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProduct,
  getProductDetails,
  productReset,
} from '../../features/productListing/ProductListingSlice';
import {FlashList} from '@shopify/flash-list';
import {displayImageUrl} from '../../utils/ImageUrl';
import Header from '../../utils/Header';
import { AppDispatch, RootState } from '../../../store';
const ProductListing = ({navigation}:any) => {
  const {product, isLoader} = useSelector((state:RootState) => state.userProduct);
  const [heart, setHeart] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // dispatch(getProduct());
    return () => {
      dispatch(productReset());
    };
  }, []);

  const handleHeartReset = () => {
    setHeart(!heart);
  };

  const handleProductDetails = (id:string) => {
    console.log("prod", id);
    dispatch(getProductDetails(id));
    navigation.navigate('ProductDeatils');
  };
  return (
    <>
      {isLoader ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      ) : (
        <View style={styles.container}>
        <Header headerPageText="Product Page" navigation={navigation} />

          <View style={styles.cardContainer}>
            <FlashList
              // horizontal={true}
              data={product}
              estimatedItemSize={200}
              numColumns={2}
              renderItem={item => {
                return (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => {
                      handleProductDetails(item?.item._id);
                    }}>
                    {/* <View style={styles.wishlistConatiner}>
                      <FontAwesome
                        name="heart"
                        size={30}
                        style={styles.heartIcon}
                      />
                    </View> */}
                    <Image
                      source={{uri: displayImageUrl + `${item.item.thumbnail}`}}
                      style={styles.categoryImage}
                    />
                    <View style={styles.productContainer}>
                      <Text style={styles.CategoryDetailsBrand}>
                        {item.item.brand}
                      </Text>
                      <Text style={styles.CategoryDetails}>
                        {item.item.title}
                      </Text>
                      <View style={styles.ratingContainer}>
                        <StarRating
                          disabled={true}
                          maxStars={5}
                          rating={item.item.rating}
                          fullStarColor={'green'}
                          starSize={20}
                        />
                      </View>
                      <Text style={styles.CategoryDetails}>
                        <FontAwesome name="rupee" size={13} color={'black'} />
                        {item.item.price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default ProductListing;

const styles = StyleSheet.create({
  // heartIcon: {
  //   color: '#EDEAE9',
  // },
  // wishlistConatiner: {
  //   zIndex: 1,
  //   position: 'absolute',
  //   top: 10,
  //   right: 10,
  // },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },

  cartIcon: {
    marginRight: 18,
  },
  leftIcon: {
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 8,
    padding: 3,
    width: 36,
    color: '#a5a1a1',
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
  cartItemValue: {
    color: '#fff',
    fontSize: 13,
    top: -2,
  },
  productContainer: {
    padding: 2,
  },
  productDetails: {
    color: '#75716f',
    fontSize: 17,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#dfe4ea',
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
    height: 300,
    backgroundColor: '#f6f6f6',
    margin: 5,
    borderRadius: 5,
  },

  iconContainer: {
    marginLeft: 110,
    position: 'absolute',
    top: 8,
    right: 12,
  },
  image: {
    width: '100%',
    height: 205,
    borderRadius: 10,
  },
  categoryImage: {
    height: 200,
    width: '100%',
  },
  CategoryDetails: {
    color: 'black',
  },
  CategoryDetailsBrand: {
    color: '#6b6f75',
    fontWeight: "500",
  },
  ratingContainer: {
    width: 40,
  },
});
