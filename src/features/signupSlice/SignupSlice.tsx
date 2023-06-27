import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

interface IUserData {
  name: string,
  phone: number | string,
  email: string,
  password: string
}

interface IState {
  status: string | null,
  isLoader: boolean
}

const initialState: IState = {
  status: null,
  isLoader: false,
};

export const getSignup = createAsyncThunk(
  'signup/getSignup',
  async (data: { userData: IUserData, navigation: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        '/users/register',
        data.userData
      );
      await AsyncStorage.setItem("token", res.data.token)
      data.navigation.navigate("LoginPage")
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);


const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSignup.pending, state => {
      state.status = 'pending';
      state.isLoader = true
    }),
      builder.addCase(getSignup.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isLoader = false
        ToastAndroid.showWithGravity(
          action.payload.message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }),
      builder.addCase(getSignup.rejected, (state, action: any) => {
        state.status = 'rejected';
        state.isLoader = false
        ToastAndroid.showWithGravity(
          action.payload.message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      });
  },
});

export default signupSlice.reducer;
