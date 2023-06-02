import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  getCartItem,
  getProductDetails,
} from '../../features/productListing/ProductListingSlice';
import StarRating from 'react-native-star-rating';
import {SliderBox} from 'react-native-image-slider-box';
import {displayImageUrl} from '../../utils/ImageUrl';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addWishlist} from '../../features/wishlist/WishlistSlice';

const ProductDeatils = ({navigation}) => {
  const {productDetals, isLoader, cartItem} = useSelector(
    state => state.userProduct,
  );
  const {isWishListLoader} = useSelector(state => state.wishlist);
  const {isLogin} = useSelector(state => state.login);
  const [userId, setUser] = useState();
  const [isProductAvailable, setIsProductAvailable] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setTimeout(()=>{
  //     dispatch(getProductDetails(userId));
  //   },1000)
  // }, []);

  const checkItemINCart = () => {
    const temp = cartItem?.filter(
      item => item.product.id === productDetals?._id,
    );
    return temp?.length > 0 ? true : false;
  };

  useEffect(() => {
    setIsProductAvailable(checkItemINCart);
  }, [checkItemINCart]);

  const concatenatedURLs =
    productDetals?.images?.length > 0 &&
    productDetals?.images?.map(item => displayImageUrl + `${item}`);

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

  const handleAddToCart = () => {
    if (!isLogin) {
      navigation.navigate('LoginPage', {
        type: 'detailsPage',
        id: productDetals?._id,
      });
    } else {
      dispatch(
        addToCart({
          user: userId,
          seller: null,
          quantity: 1,
          product: productDetals,
        }),
      )
        .unwrap()
        .then(() => dispatch(getCartItem(userId)));
    }
  };

  const handleBuyNow = () => {
    if (!isLogin) {
      navigation.navigate('LoginPage', {
        type: 'detailsPage',
        id: productDetals?._id,
      });
    } else {
      dispatch(
        addToCart({
          user: userId,
          seller: null,
          quantity: 1,
          product: productDetals,
        }),
      )
        .unwrap()
        .then(
          () => dispatch(getCartItem(userId)),
          setTimeout(()=>{
            navigation.navigate('OrderSummary')
          },500)
        );
    }
  };
  const handleGoToCart = () => {
    navigation.navigate('CartPage');
  };

  const handleWishlist = () => {
    dispatch(addWishlist({productId: productDetals._id, userId}));
  };

  return (
    <>
      {isLoader ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <AntDesign
              onPress={() => navigation.openDrawer()}
              name="menuunfold"
              size={30}
              color={'white'}
            />
            <View>
              <Text style={styles.headerText}>Product Details</Text>
            </View>
          </View>
          <View style={styles.wishlistConatiner}>
            {isWishListLoader ? (
              <View>
                <ActivityIndicator size="large" color="#ff6600" />
              </View>
            ) : (
              <FontAwesome
                name="heart"
                size={40}
                style={{color: productDetals?.isWishlist ? 'red' : '#EDEAE9'}}
                onPress={() => handleWishlist()}
              />
            )}
          </View>
          {productDetals && (
            <SliderBox
              images={concatenatedURLs}
              dotColor="red"
              style={styles.image}
              autoplay={true}
              circleLoop={true}
              autoplayInterval={3000}
            />
          )}

          <View style={styles.productContainer}>
            <Text style={styles.productDetailsBrand}>
              {productDetals?.brand}
            </Text>
            <Text style={styles.productDetails}>{productDetals?.title}</Text>
            <View style={styles.ratingContainer}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={productDetals.rating}
                fullStarColor={'green'}
                starSize={20}
              />
            </View>
            <Text style={styles.productPrice}>
              <FontAwesome name="rupee" size={18} color={'black'} />
              {productDetals?.price}
            </Text>
            <View>
              <Text style={{color: 'black', fontSize: 18}}>Description:</Text>
              <Text style={{color: 'black', fontSize: 15}}>
                {productDetals.description}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {isProductAvailable ? (
              <Pressable
                style={styles.buttonAddToCart}
                onPress={() => handleGoToCart()}>
                <Text style={styles.buttonAddToCartText}>GO TO CART</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.buttonAddToCart}
                onPress={() => handleAddToCart()}>
                <Text style={styles.buttonAddToCartText}>Add to cart</Text>
              </Pressable>
            )}
            <Pressable style={styles.buttonBuy} onPress={() => handleBuyNow()}>
              <Text style={styles.buttonBuyNow}>Buy Now</Text>
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default ProductDeatils;

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
  // heartIcon: {
  //   color: productDetals?.isWishlist ? "red" : '#EDEAE9',
  // },
  wishlistConatiner: {
    zIndex: 1,
    position: 'absolute',
    top: 60,
    right: 10,
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
  headerText: {
    fontSize: 20,
    color: '#fff',
    marginRight: 145,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 8,
    padding: 3,
    width: 36,
    color: '#a5a1a1',
  },
  image: {
    width: '98%',
    height: 400,
    borderRadius: 10,
    marginLeft: 5,
    marginTop: 5,
  },
  headerContainer: {
    height: 50,
    backgroundColor: '#ff6600',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  imageContainer: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
  },
  productContainer: {
    padding: 10,
  },
  productDetails: {
    fontSize: 20,
    color: '#242222',
    fontWeight: '500',
  },
  productDetailsBrand: {
    fontSize: 15,
    color: 'gray',
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '500',
    color: '#0059ff',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    position: 'absolute',
    bottom: 0,
  },
  buttonAddToCart: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
  },
  buttonBuy: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6600',
    height: 50,
  },
  buttonAddToCartText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '400',
  },
  buttonBuyNow: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '400',
  },
  ratingContainer: {
    width: 40,
  },
});
