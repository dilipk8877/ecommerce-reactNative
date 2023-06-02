import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosInstance} from '../../utils/AxiosInstance';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { ToastAndroid } from 'react-native';
export const getSignup = createAsyncThunk(
  'signup/getSignup',
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        '/users/register',
        data
      );
      if(res && res.data && res.data.token){
        AsyncStorage.setItem('token', res.data.token);
      }
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);


const initialState = {
  status: null,
  isSignup: AsyncStorage.getItem('token') ? true : false,
};
const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSignup.pending, state => {
      state.status = 'pending';
    }),
      builder.addCase(getSignup.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isSignup = true;
        ToastAndroid.showWithGravity(
          action.payload.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }),
      builder.addCase(getSignup.rejected, (state, action) => {
        state.status = 'rejected';
      });
  },
});

export default signupSlice.reducer;
