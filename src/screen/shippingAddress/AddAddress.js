import React, {useState} from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {addAddress, updateAddress} from '../../features/address/AddressSlice';
const AddAddress = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoader, preFieldValue} = useSelector(state => state.address);
  const [address, setAddress] = useState({
    fullName: preFieldValue?.fullName ? preFieldValue?.fullName : '',
    addressLine1: preFieldValue?.addressLine1
      ? preFieldValue?.addressLine1
      : '',
    addressLine2: preFieldValue?.addressLine2
      ? preFieldValue?.addressLine2
      : '',
    city: preFieldValue?.city ? preFieldValue?.city : '',
    state: preFieldValue?.state ? preFieldValue?.state : '',
    postalCode: preFieldValue?.postalCode ? preFieldValue?.postalCode : '',
    country: preFieldValue?.country ? preFieldValue?.country : '',
    phone: preFieldValue?.phone ? preFieldValue?.phone : '',
  });

  const handleInputChange = (fieldName, value) => {
    setAddress({...address, [fieldName]: value});
  };
  const handleSaveAddress = () => {
    dispatch(addAddress({address, navigation}));
  };


  const handleUpdateAddress = () => {

    dispatch(updateAddress({address, navigation, id: preFieldValue?._id}));
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
            <View>
              <AntDesign
                onPress={() => navigation.openDrawer()}
                name="menuunfold"
                size={30}
                color={'white'}
              />
            </View>
            {preFieldValue === null ? (
              <View>
                <Text style={styles.headerText}>Add Address</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.headerText}>Update Address</Text>
              </View>
            )}
          </View>
          <ScrollView>
            <View style={styles.maniContainer}>
              <TextInput
                placeholder="Full Name"
                style={styles.inputField}
                value={address.fullName}
                onChangeText={value => handleInputChange('fullName', value)}
              />
              <TextInput
                placeholder="Phone Number"
                style={styles.inputField}
                value={address.phone}
                onChangeText={value => handleInputChange('phone', value)}
              />
              <TextInput
                placeholder="Pincode"
                style={styles.inputField}
                value={address.postalCode}
                onChangeText={value => handleInputChange('postalCode', value)}
              />
              <TextInput
                placeholder="Country"
                style={styles.inputField}
                value={address.country}
                onChangeText={value => handleInputChange('country', value)}
              />
              <TextInput
                placeholder="State"
                style={styles.inputField}
                value={address.state}
                onChangeText={value => handleInputChange('state', value)}
              />
              <TextInput
                placeholder="City"
                style={styles.inputField}
                value={address.city}
                onChangeText={value => handleInputChange('city', value)}
              />
              <TextInput
                placeholder="House No., Building Name"
                style={styles.inputField}
                value={address.addressLine1}
                onChangeText={value => handleInputChange('addressLine1', value)}
              />
              <TextInput
                placeholder="Road name, Area, Colony"
                style={styles.inputField}
                value={address.addressLine2}
                onChangeText={value => handleInputChange('addressLine2', value)}
              />
            </View>
            <View style={styles.buttonMain}>
              {preFieldValue === null ? (
                <Pressable
                  style={styles.buttonContainer}
                  onPress={handleSaveAddress}>
                  <Text style={styles.button}>Save Address</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={styles.buttonContainer}
                  onPress={handleUpdateAddress}>
                  <Text style={styles.button}>Update Address</Text>
                </Pressable>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default AddAddress;
const styles = StyleSheet.create({
  container: {
    // width: '100%',
    height: '100%',
    backgroundColor: '#dfe4ea',
  },
  headerContainer: {
    height: 50,
    backgroundColor: '#ff6600',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    marginRight: 130,
  },
  maniContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  inputField: {
    borderColor: '#ff6600',
    borderWidth: 1,
    width: '90%',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  buttonMain: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#ff6600',
    borderRadius: 5,
    marginTop: 20,
  },
  button: {
    fontSize: 20,
    fontWeight: 500,
    color: 'white',
  },
});