// import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwtDecode from 'jwt-decode';
// import React, { useEffect } from 'react';
// import {View} from 'react-native/types';
// import {useDispatch, useSelector} from 'react-redux';
// import { setUserDetails } from '../features/loginSlice/LoginSlice';

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

// const auth = () => {
//   const {isLogin} = useSelector(state => state.login);
//   const dispatch = useDispatch()
  

//   useEffect(() => {
//     getToken();
//   }, [isLogin]);

//   return ;
// };

// export default auth;

export const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken
    }
  };