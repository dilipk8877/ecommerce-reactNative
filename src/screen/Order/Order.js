import {FlashList} from '@shopify/flash-list';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getCategory} from '../../features/categoryListing/CategoryListingSlice';
import StarRating from 'react-native-star-rating';
import AntDesign from 'react-native-vector-icons/AntDesign';
const OrderSection = ({navigation}) => {
  const {category, isLoader} = useSelector(state => state.userCategory);
  const {isLogin} = useSelector(state => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <AntDesign
          onPress={() => navigation.openDrawer()}
          name="menuunfold"
          size={30}
          color={'white'}
        />
        <View>
          <Text style={styles.headerText}>My Orders</Text>
        </View>
      </View>
      {/* <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      /> */}
      {false ? (
        <View style={styles.cardContainer}>
          <FlashList
            data={category}
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
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No order!</Text>
        </View>
      )}
    </View>
  );
};

export default OrderSection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#dfe4ea',
  },
  headerContainer: {
    height: 50,
    width: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: '#ff6600',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    marginRight: 165,
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
  orderImage: {
    width: 100,
    height: 100,
  },
  deleveredText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 400,
  },
  productDetails: {
    width: '65%',
  },
  cardContainer: {
    flexDirection: 'column',
    // flexWrap: 'wrap',
    marginTop: 50,
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
