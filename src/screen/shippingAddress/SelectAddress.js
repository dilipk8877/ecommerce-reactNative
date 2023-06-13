import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllAddress, setEditValue} from '../../features/address/AddressSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlashList} from '@shopify/flash-list';
import {RadioButton} from 'react-native-paper';
import {
  createOrder,
  setDeliveredAddress,
} from '../../features/address/CreateOrderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import Header from '../../utils/Header';
const SelectAddress = ({navigation}) => {
  const {address, isLoader} = useSelector(state => state.address);
  const {deliveredAddress} = useSelector(state => state.createOrder);
  const {totalPrice, cartItem} = useSelector(state => state.userProduct);
  const [selectedOption, setSelectedOption] = useState(null);
  const [toggle,setToggle] = useState(false);
  const dispatch = useDispatch();
  const [userId, setUser] = useState();

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

  useEffect(() => {
    dispatch(getAllAddress());
  }, [toggle]);

  const handleEdit = item => {
    dispatch(setEditValue(item));
    setTimeout(() => {
      navigation.navigate('AddAddress');
    }, 500);
  };

  const handleSaveNewAddress = () => {
    dispatch(setEditValue(null));
    navigation.navigate('AddAddress');
  };

  const handleContinueOrder = () => {
    dispatch(
      createOrder({
        name: deliveredAddress?.fullName,
        amount: totalPrice,
        userId: userId,
        address: deliveredAddress,
        products: cartItem,
        testMode: true,
      }),
    );
    navigation.navigate('OrderSummary');
  };

  const handleSelectOption = option => {
    setSelectedOption(option);
    setToggle(!toggle)
    dispatch(setDeliveredAddress(option));
  };

  return (
    <>
      {isLoader ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      ) : (
        <View style={styles.container}>
        <Header headerPageText="Select Address" />
          <View style={styles.newAddressContainer}>
            <Text style={styles.newAddressText} onPress={handleSaveNewAddress}>
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
                    <View style={styles.radioButton}>
                      <View style={{marginRight: 10}}>
                        <TouchableOpacity
                          style={styles.outer}
                          onPress={() => handleSelectOption(item.item)}>
                          {selectedOption?._id === item.item._id && (
                            <View style={styles.inner}></View>
                          )}
                        </TouchableOpacity>
                      </View>
                      <View>
                        <Text style={styles.cardText}>
                          {item.item.fullName}
                        </Text>
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
                    </View>
                    <View style={styles.modal}>
                      <Pressable onPress={() => handleEdit(item.item)}>
                        <Text style={styles.modalText}>Edit</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={{height: 10}}></View>
                </>
              );
            }}
          />
          {deliveredAddress && (
            <View style={styles.bottomConatiner}>
              <View style={styles.cartBottom}>
                <Pressable
                  style={styles.CartPageBottom}
                  onPress={() => handleContinueOrder()}>
                  <Text style={styles.CartPagePlace}>Continue</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default SelectAddress;

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
  radioButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  bottomConatiner: {
    // marginTop: 15,
    height: 50,
  },
  cartBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  CartPageBottom: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6600',
    height: 40,
    marginRight: 9,
  },
  outer: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: 'black',
  },
});
