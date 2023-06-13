import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { axiosInstance} from '../../utils/AxiosInstance';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProductDetails } from '../productListing/ProductListingSlice';

export const getWishlist = createAsyncThunk(
  'wishlist/getWishlist',
  async (userId, thunkAPI) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axiosInstance.get(`/wishlist/${userId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addWishlist = createAsyncThunk(
  'wishlist/addWishlist',
  async (productId, thunkAPI) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axiosInstance.post(
        '/wishlist/add',
        {productId:productId},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      thunkAPI.dispatch(getProductDetails(productId));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const removeItemFromWishlist = createAsyncThunk(
  'wishlist/removeItemFromWishlist',
  async (data, thunkAPI) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axiosInstance.delete(`/wishlist/${data.id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      thunkAPI.dispatch(getWishlist(data.userId));
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState = {
  wishList: [],
  status: null,
  isWishListLoader: false,
};

const wishlishSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getWishlist.pending, state => {
      state.status = 'pending';
      state.isWishListLoader = true;
    }),
      builder.addCase(getWishlist.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isWishListLoader = false;
        state.wishList = action.payload;
      }),
      builder.addCase(getWishlist.rejected, (state, action) => {
        state.status = 'rejected';
        state.isWishListLoader = false;
      });
 
    builder.addCase(removeItemFromWishlist.pending, state => {
      state.status = 'pending';
      state.isWishListLoader = true;
    }),
      builder.addCase(removeItemFromWishlist.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isWishListLoader = false;
        ToastAndroid.showWithGravity(
          action.payload?.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }),
      builder.addCase(removeItemFromWishlist.rejected, (state, action) => {
        state.status = 'rejected';
        state.isWishListLoader = false;
      });
      builder.addCase(addWishlist.pending, state => {
        state.status = 'pending';
        state.isWishListLoader = true;
      }),
        builder.addCase(addWishlist.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.isWishListLoader = false;
          ToastAndroid.showWithGravity(
            action.payload?.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }),
        builder.addCase(addWishlist.rejected, (state, action) => {
          state.status = 'rejected';
          state.isWishListLoader = false;
        });
  },
});

export default wishlishSlice.reducer;
