import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {getCategory} from '../../features/categoryListing/CategoryListingSlice';
import {deleteAddress, getAllAddress, setEditValue} from '../../features/address/AddressSlice';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../utils/Header';
const ShippingAddress = ({navigation}) => {
  const {address, isLoader} = useSelector(state => state.address);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAddress());
  }, []);



const handleDelete = (id)=>{
  dispatch(deleteAddress(id))
}

const handleEdit =(item)=>{

  dispatch(setEditValue(item))
  setTimeout(()=>{
    navigation.navigate("AddAddress")
  },500)
}

const handleSaveNewAddress = () =>{
  dispatch(setEditValue(null))
  navigation.navigate('AddAddress')
}
  return (
    <>
      {isLoader ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      ) : (
        <View style={styles.container}>
        <Header headerPageText="Shipping Address" />
          <View style={styles.newAddressContainer}>
            <Text
              style={styles.newAddressText}
              onPress={handleSaveNewAddress}>
              + Add a new Address
            </Text>
          </View>
          <Text style={styles.smallText}>
            {address?.addresses?.length} SAVED ADDRESSES
          </Text>
          <FlashList
            data={address?.addresses}
            estimatedItemSize={200}
            renderItem={item => {
              return (
                <>
                  <View style={styles.card}>
                    <View>
                      <Text style={styles.cardText}>{item.item.fullName}</Text>
                      <Text style={styles.cardText}>
                        {item.item.addressLine1}, {item.item.addressLine2}
                      </Text>
                      <Text style={styles.cardText}>
                        {item.item.city}, {item.item.state} ,{' '}
                        {item.item.country}
                      </Text>
                      <Text style={styles.cardText}>
                        {item.item.postalCode}
                      </Text>
                      <Text style={styles.cardText}>{item.item.phone}</Text>
                    </View>
                    <View style={styles.modal}>
                      <Pressable onPress={() => handleEdit(item.item)}>
                        <Text style={styles.modalText}>Edit</Text>
                      </Pressable>
                      <Pressable>
                        <Text
                          style={styles.modalText}
                          onPress={() => handleDelete(item.item._id)}>
                          Remove
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={{height: 10}}></View>
                </>
              );
            }}
          />
        </View>
      )}
    </>
  );
};

export default ShippingAddress;

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    height: '100%',
    backgroundColor: '#dfe4ea',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  newAddressContainer: {
    backgroundColor: 'white',
    height: 65,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  newAddressText: {
    fontSize: 18,
    fontWeight: 500,
    color: '#ff6600',
  },
  smallText: {
    fontSize: 13,
    fontWeight: 500,
    marginTop: 20,
    padding: 20,
    color: '#000',
  },


  card: {
    width: '100%',
    height: 150,
    backgroundColor: 'white',
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 400,
  },
  modal: {
    zIndex: 1,
    width: 80,
    height: 85,
    // backgroundColor: '#E9EDED',
    position: 'absolute',
    top: 10,
    right: 0,
    padding: 10,
  },
  modalText: {
    color: '#000',
    fontWeight: 500,
    padding: 5,
    fontSize: 12,
  },
});
