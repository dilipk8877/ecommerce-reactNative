import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getCategory} from '../../features/categoryListing/CategoryListingSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getWishlist,
  removeItemFromWishlist,
} from '../../features/wishlist/WishlistSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {displayImageUrl} from '../../utils/ImageUrl';
import {getProductDetails} from '../../features/productListing/ProductListingSlice';

const Wishlist = ({navigation}) => {
  const {wishList, isWishListLoader} = useSelector(state => state.wishlist);
  const [userId, setUser] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishlist(userId));
  }, [userId]);

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

  const handleProductDetails = id => {
    dispatch(getProductDetails(id));
    navigation.navigate('ProductDeatils');
  };

  const handleRemoveItem = id => {
    dispatch(removeItemFromWishlist({id, userId}));
  };

  return (
    <>
      {isWishListLoader ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View>
              <AntDesign
                onPress={() => navigation.openDrawer()}
                name="menuunfold"
                size={30}
                color={'white'}
              />
            </View>
            <View>
              <Text style={styles.headerText}>Wishlist</Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          {wishList?.products > 0 ? (
            <View style={styles.cardContainer}>
              <FlashList
                data={wishList?.products}
                estimatedItemSize={200}
                numColumns={2}
                renderItem={item => {
                  return (
                    <TouchableOpacity
                      style={styles.card}
                      onPress={() => {
                        handleProductDetails(item?.item._id);
                      }}>
                      <Image
                        source={{
                          uri: displayImageUrl + item.item.thumbnail,
                        }}
                        style={styles.wishlistImage}
                      />
                      <Text style={styles.productName}>{item.item.title}</Text>
                      <View style={styles.wishlistButton}>
                        <MaterialCommunityIcons
                          name="delete"
                          size={35}
                          onPress={() => handleRemoveItem(item.item._id)}
                        />
                        <Pressable
                          style={styles.buttonAddToCart}
                          onPress={() => handleAddToCart()}>
                          <Text style={styles.buttonAddToCartText}>
                            Add to cart
                          </Text>
                        </Pressable>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your Wishlist is Empty</Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default Wishlist;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  emptyContainer:{
    justifyContent: 'center',
    alignItems:"center",
    width:"100%",
    height:"100%",
  },
  emptyText:{
    fontSize:22
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
    marginRight: 150,
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
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 5,
  },
  wishlistImage: {
    height: 200,
    width: '100%',
  },
  productName: {
    color: 'black',
    fontSize: 18,
    padding: 5,
  },
  wishlistButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  buttonAddToCart: {
    width: '55%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6600',
    height: 40,
    padding: 2,
    borderRadius: 5,
  },
  buttonAddToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
  },
});
