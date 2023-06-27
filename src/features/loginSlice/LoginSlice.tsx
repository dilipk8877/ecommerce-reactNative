import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosInstance} from '../../utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

interface IState{
  status: string | null,
  isLogin: boolean,
  isLoader:boolean,
  userToken:string | null,
}

const initialState:IState = {
  status: null,
  isLogin: false,
  isLoader:false,
  userToken:null,
};

export const getLogin = createAsyncThunk(
  'login/getLogin',
  async (data:any, thunkAPI) => {
    try {
      const res = await axiosInstance.post('/users/login', data);
     await AsyncStorage.setItem('token', res.data.token);
     
      return res.data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);




const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logOutUser: state => {
      AsyncStorage.clear();
      state.isLogin = false;
    },
    setIslogin:(state,action)=>{
      state.isLogin = action.payload
    },
    setIslogout:(state,action)=>{
      state.isLogin = false
    },

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
      builder.addCase(getLogin.rejected, (state, {payload}:any) => {
        state.status = 'rejected';
        state.isLoader = false;
        ToastAndroid.showWithGravity(
          payload?.message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      });
  },
});
export const {logOutUser, setIslogin, setIslogout} = loginSlice.actions
export default loginSlice.reducer;