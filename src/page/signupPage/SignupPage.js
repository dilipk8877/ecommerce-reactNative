import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
import {getSignup} from '../../features/signupSlice/SignupSlice';
import {useFormik} from 'formik';

import * as Yup from 'yup';
import { getTokenAccess } from '../../utils/AxiosInstance';
const SignupPage = ({navigation}) => {
  const {isLoader} = useSelector(state => state.signup);
  const dispatch = useDispatch();

  const [token, setToken] = useState('');

  useEffect(() => {
    getTokenAccess().then((token) => {
      if (token) {
        setToken(token);
      }
    });
  }, []);
  useEffect(()=>{
    if(token) {
      navigation.navigate("CategoryListing")
    }
  },[token])

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please enter Full Name'),
      email: Yup.string()
        .email('Enter valid Email')
        .required('Please enter Email'),
      phone: Yup.string()
        .required('Please enter phone number')
        .matches(phoneRegExp, 'Phone number is not valid'),
      password: Yup.string().required('Please enter password'),
    }),
    onSubmit: (data,action) => {
      dispatch(getSignup({user:data,navigation}))
    },
  });


  return (
    <>
      {isLoader ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#efa248', '#f28346']}
          style={styles.linearGradient}>
          <View style={styles.header}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.welcomeMessage}>Signup to continue</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.formHeader}>
              <Pressable onPress={() => navigation.navigate('LoginPage')}>
                <Text style={styles.login}>LOGIN</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.signup}>SIGNUP</Text>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#efa248', '#f28346']}
                  style={styles.activeGradient}></LinearGradient>
              </Pressable>
            </View>
            <View style={styles.inputContainer}>
              <View style={{width: '100%', marginBottom: 10}}>
                <Ionicons
                  name="person-outline"
                  size={30}
                  style={styles.personIcon}
                />
                <TextInput
                  style={styles.inputFieldUser}
                  placeholder="User Name"
                  placeholderTextColor="#000"
                  value={values.name}
                  onChangeText={handleChange('name')}
                />
                {touched.name && errors.name && (
                  <Text style={{color: 'red'}}>{errors.name}</Text>
                )}
              </View>
              <View style={{width: '100%', marginBottom: 10}}>
                <Fontisto name="email" size={30} style={styles.emailIcon} />
                <TextInput
                  style={styles.inputFieldEmail}
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
                <Fontisto name="phone" size={22} style={styles.phoneIcon} />
                <TextInput
                  style={styles.inputFieldPhone}
                  placeholder="Phone Number"
                  placeholderTextColor="#000"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                />
                {touched.phone && errors.phone && (
                  <Text style={{color: 'red'}}>{errors.phone}</Text>
                )}
              </View>

              <View style={{width: '100%', marginBottom: 10}}>
                <MaterialCommunityIcons
                  name="lock-open-check-outline"
                  size={30}
                  style={styles.passwordsIcon}
                />
                <TextInput
                  style={styles.inputFieldPassword}
                  placeholder="Password"
                  placeholderTextColor="#000"
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
                <Text style={styles.buttonText}>Signup</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </LinearGradient>
      )}
    </>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
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
    marginTop: 50,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  login: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signup: {
    color: 'black',
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
  inputFieldUser: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    // marginBottom: 10,
    paddingLeft: 45,
    fontSize: 15,
    color: 'black',
  },
  inputFieldEmail: {
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
  inputFieldPhone: {
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
  inputFieldPassword: {
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
  personIcon: {
    color: 'gray',
    position: 'absolute',
    top: 8,
    left: 10,
  },
  emailIcon: {
    color: 'grey',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  phoneIcon: {
    color: 'grey',
    position: 'absolute',
    top: 12,
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
    marginTop: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 20,
  },
});
