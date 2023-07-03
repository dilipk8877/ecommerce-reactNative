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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getWishlist,
  removeItemFromWishlist,
} from '../../features/wishlist/WishlistSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {displayImageUrl} from '../../utils/ImageUrl';
import {getProductDetails} from '../../features/productListing/ProductListingSlice';
import Header from '../../utils/Header';
import { AppDispatch, RootState } from '../../../store';


interface IWishList {
  item:{
    _id:string;
    thumbnail:string;
    title:string;
  }
}
const Wishlist = ({navigation}:any) => {
  const {wishList, isWishListLoader} = useSelector((state:any) => state.wishlist);
  const [userId, setUser] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getWishlist(userId));
  }, [userId]);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decodedToken:{id:string} = jwtDecode(token);
      setUser(decodedToken?.id);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleProductDetails = (id:string) => {
    dispatch(getProductDetails(id));
    navigation.navigate('ProductDeatils');
  };

  const handleRemoveItem = (id:string) => {
    dispatch(removeItemFromWishlist({id, userId}));
  };

  const handleAddToCart = () =>{

  }

  return (
    <>
      {isWishListLoader ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      ) : (
        <View style={styles.container}>
        <Header headerPageText="Wishlist" navigation={navigation} />
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          {wishList?.products?.length > 0 ? (
            <View style={styles.cardContainer}>
              <FlashList
                data={wishList?.products}
                estimatedItemSize={200}
                numColumns={2}
                renderItem={(item:IWishList) => {
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
                          color={"black"}
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
    fontSize:22,
    color:"#000"
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
    width: '60%',
    height:"auto",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6600',
    padding: 4,
    borderRadius: 5,
  },
  buttonAddToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
});
