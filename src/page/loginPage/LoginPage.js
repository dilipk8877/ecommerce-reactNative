import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getLogin} from '../../features/loginSlice/LoginSlice';
import {
  useFocusEffect,
  useRoute,
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';
import {getProductDetails} from '../../features/productListing/ProductListingSlice';
import {useFormik} from 'formik';

import * as Yup from 'yup';
const LoginPage = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {isLogin, status, isLoader} = useSelector(state => state.login);

  const {values, handleChange, handleSubmit, touched, errors} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Please enter your email'),
      password: Yup.string().required('Please enter your password'),
    }),
    onSubmit: (data, action) => {
      dispatch(getLogin({data, action}));
    },
  });

  useEffect(() => {
    if (status === 'fulfilled') {
      if (route.params && route.params.type === 'detailsPage') {
        dispatch(getProductDetails(route.params.id));
        navigation.navigate('ProductDeatils');
      } else if (route.params && route.params.type === 'cartPage') {
        navigation.navigate('CartPage');
      } else if (route.params && route.params.type === 'profilePage') {
        navigation.navigate('Profile');
      } else {
        navigation.navigate('BottomNavigation');
      }
    }
  }, [isLoader]);
  const {setOptions} = useNavigation();
  useEffect(() => {
    setOptions({tabBarHidden: true});
  }, []);
  return (
    <>
      {isLoader ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.welcome}>Welcome Back</Text>
            <Text style={styles.welcomeMessage}>Signin to continue</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={styles.formContainer}>
              <View style={styles.formHeader}>
                <Pressable>
                  <Text style={styles.login}>LOGIN</Text>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#efa248', '#f28346']}
                    style={styles.activeGradient}></LinearGradient>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('SignupPage')}>
                  <Text style={styles.signup}>SIGNUP</Text>
                </Pressable>
              </View>
              <View style={styles.inputContainer}>
                <View style={{width: '100%', marginBottom: 10}}>
                  <Fontisto name="email" size={30} style={styles.emailIcon} />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Email"
                    placeholderTextColor="#000"
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={{color: 'red'}}>{errors.email}</Text>
                  )}
                </View>
                <View style={{width: '100%', marginBottom: 10}}>
                  <MaterialCommunityIcons
                    name="lock-open-check-outline"
                    size={30}
                    style={styles.passwordsIcon}
                  />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#000"
                    style={styles.inputField}
                    secureTextEntry={true}
                    value={values.password}
                    onChangeText={handleChange('password')}
                  />
                  {touched.password && errors.password && (
                    <Text style={{color: 'red'}}>{errors.password}</Text>
                  )}
                </View>
              </View>
              <Pressable onPress={handleSubmit}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#efa248', '#f28346']}
                  style={styles.buttonGradient}>
                  <Text style={styles.buttonText}>Login</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    backgroundColor: '#ff6600',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  linearGradient: {
    width: '100%',
    height: 370,
    alignItems: 'center',
  },
  header: {
    marginTop: 70,
    alignItems: 'center',
  },
  welcome: {
    fontStyle: 'italic',
    fontSize: 30,
    fontWeight: '400',
    color: '#fff',
  },
  welcomeMessage: {
    // marginTop: 20,
    paddingTop: 20,
    fontStyle: 'italic',
    fontSize: 18,
    fontWeight: '400',
    color: '#fff',
  },
  formContainer: {
    width: '80%',
    height: 'auto',
    backgroundColor: '#fff',
    marginTop: 70,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  login: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signup: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 18,
  },
  formHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingLeft: 45,
    paddingRight: 45,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  inputField: {
    width: '100%',
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 50,
    // marginBottom: 10,
    paddingLeft: 45,
    fontSize: 15,
    color: 'black',
  },
  emailIcon: {
    color: 'grey',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  passwordsIcon: {
    color: 'grey',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  buttonGradient: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
  },
  activeGradient: {
    width: '100%',
    height: 3,
    borderRadius: 20,
    // marginTop:2
  },
  buttonText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 20,
  },
});
