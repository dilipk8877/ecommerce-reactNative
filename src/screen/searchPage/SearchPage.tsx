import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {searchProduct} from '../../features/searchProduct/SearchSlice';
import {displayImageUrl} from '../../utils/ImageUrl';
import {getProductDetails} from '../../features/productListing/ProductListingSlice';
import { AppDispatch, RootState } from '../../../store';
const SearchPage = ({navigation}:any) => {
  const {searchList, isLoading} = useSelector((state:RootState) => state.searchItem);
  const dispatch = useDispatch<AppDispatch>();

  const handleProductDetails = (id:string) => {
    dispatch(getProductDetails(id));
    navigation.navigate('ProductDeatils');
  };
  return (
    <View style={Style.container}>
      <View style={Style.searchContainer}>
        <AntDesign name="search1" size={25} color="black" />
        <TextInput
          placeholder="Search"
          style={Style.inputField}
          onChangeText={text => dispatch(searchProduct(text))}
        />
      </View>
      {isLoading ? (
        <View style={[Style.card, Style.horizontal]}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      ) : (
        <View style={Style.card}>
          <FlashList
            data={searchList}
            estimatedItemSize={200}
            renderItem={item => {
              return (
                <TouchableOpacity
                  style={Style.cardContainer}
                  onPress={() => {
                    handleProductDetails(item?.item._id);
                  }}>
                  <View>
                    <Image
                      source={{uri: displayImageUrl + `${item.item.thumbnail}`}}
                      style={Style.cardImage}
                    />
                  </View>
                  <View style={Style.productDetails}>
                    <Text style={{fontSize: 18, color: 'black'}}>
                      {item.item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
                 <View style={{height:60}}></View>
        </View>
      )}
    </View>
  );
};

export default SearchPage;

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe4ea',
  },
  searchContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  inputField: {
    fontSize: 18,
    color: '#000',
    width: '95%',
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  cardContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productDetails: {
    marginLeft: 10,
  },
  card: {
    height: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
