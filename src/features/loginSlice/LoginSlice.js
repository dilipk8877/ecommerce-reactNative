import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosInstance} from '../../utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

export const getLogin = createAsyncThunk(
  'login/getLogin',
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post('/users/login', data.data);
     await AsyncStorage.setItem('token', res.data.token);
      thunkAPI.dispatch(setIslogin())
      data.actiom.resetForm()
      return res.dara;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// const userToekn = AsyncStorage.getItem("token") ? AsyncStorage.getItem("token") : null; 

const initialState = {
  status: null,
  isLogin: AsyncStorage.getItem('token') ? true : false,
  isLoader:false,
  user:null,
  userToken:null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logOutUser: state => {
      AsyncStorage.clear();
      state.isLogin = false;
    },
    setIslogin:(state,action)=>{
      state.isLogin = true
    },
    setIslogout:(state,action)=>{
      state.isLogin = false
    },
    setUserDetails:(state,action)=>{
      state.user= action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getLogin.pending, state => {
      state.status = 'pending';
      state.isLoader = true;
    }),
      builder.addCase(getLogin.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isLoader = false;
        state.isLogin=true
        state.userToken=action.payload.token
        ToastAndroid.showWithGravity(
          action.payload?.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }),
      builder.addCase(getLogin.rejected, (state, action) => {
        state.status = 'rejected';
        state.isLoader = false;
      });
  },
});
export const {logOutUser, setIslogin, setIslogout, setUserDetails} = loginSlice.actions
export default loginSlice.reducer;
