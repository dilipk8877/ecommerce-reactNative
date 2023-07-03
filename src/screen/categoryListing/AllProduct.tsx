import { FlashList } from '@shopify/flash-list'
import React from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import { TouchableOpacity, View } from 'react-native'
import { displayImageUrl } from '../../utils/ImageUrl'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { getProductDetails } from '../../features/productListing/ProductListingSlice'

const AllProduct = ({navigation}:any) => {
    const { allProduct } = useSelector((state: RootState) => state.userProduct);
  const dispatch = useDispatch<AppDispatch>();

    const handleProductDetails = (id: string) => {
        dispatch(getProductDetails(id));
        navigation.navigate('ProductDeatils');
      };
  return (
    <FlashList
    data={allProduct}
    estimatedItemSize={200}
    numColumns={3}
    renderItem={(item): any => {
      return (
        <TouchableOpacity
          style={styles.productCard}
          onPress={() => {
            handleProductDetails(item?.item._id);
          }}>
         
          <Image
            source={{ uri: displayImageUrl + `${item.item.thumbnail}` }}
            style={styles.topCategoryImage}
          />
          <View style={styles.ratingContainer}>
              <Text style={{fontSize:18,color:"#fff"}}>{item.item.rating} <FontAwesome name='star-o' size={18} /></Text>
            </View>
          <View style={styles.productContainer}>
            <Text style={styles.CategoryDetailsBrand}>
              {item.item.brand}
            </Text>
            <Text style={styles.CategoryDetails}>
              {item.item.title}
            </Text>
            
            <Text style={styles.CategoryDetails}>
              <FontAwesome name="rupee" size={13} color={'black'} />
              {item.item.price}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }}
  />
  )
}

export default AllProduct
const styles = StyleSheet.create({
    productCard:{
        padding: 5,
        width: '95%',
        backgroundColor: '#f6f6f6',
        margin: 5,
        borderRadius: 5,
        height:190
      },
      productContainer: {
        padding: 2,
      },
      CategoryDetailsBrand: {
        color: '#6b6f75',
        fontWeight: "500",
      },
      ratingContainer: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#0cac49",
        position:"absolute",
        top:81,
        left:5
      },
      CategoryDetails: {
        color: 'black',
      },
      topCategoryImage:{
        height: 100,
        width: "100%",
      },
})