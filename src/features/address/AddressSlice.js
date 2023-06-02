import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosInstance} from '../../utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';
export const getAllAddress = createAsyncThunk(
  'address/getAllAddress',
  async (_, thunkAPI) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axiosInstance.get('/address/get', {
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
export const addAddress = createAsyncThunk(
  'add/addAddress',
  async (data, thunkAPI) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axiosInstance.post('/address/add', data.address, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      thunkAPI.dispatch(getAllAddress());
      data.navigation.navigate('ShippingAddress');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async (id, thunkAPI) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axiosInstance.delete(`/address/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      thunkAPI.dispatch(getAllAddress());
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateAddress = createAsyncThunk(
  'update/updateAddress',
  async (data, thunkAPI) => {
    const token = await AsyncStorage.getItem('token');

    try {
      const res = await axiosInstance.put(`/address/${data.id}`, data.address, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      thunkAPI.dispatch(getAllAddress());
      data.navigation.navigate('ShippingAddress');
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
const initialState = {
  address: [],
  isLoader: false,
  status: null,
  preFieldValue: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setEditValue: (state, action) => {
      state.preFieldValue = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(addAddress.pending, state => {
      state.status = 'pending';
      state.isLoader = true;
    }),
      builder.addCase(addAddress.fulfilled, (state, action) => {
        state.status = 'success';
        state.isLoader = false;
        ToastAndroid.showWithGravity(
          action.payload?.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }),
      builder.addCase(addAddress.rejected, state => {
        state.status = 'rejected';
        state.isLoader = false;
      }),
      builder.addCase(updateAddress.pending, state => {
        state.status = 'pending';
        state.isLoader = true;
      }),
        builder.addCase(updateAddress.fulfilled, (state, action) => {
          state.status = 'success';
          state.isLoader = false;
          ToastAndroid.showWithGravity(
            action.payload?.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }),
        builder.addCase(updateAddress.rejected, state => {
          state.status = 'rejected';
          state.isLoader = false;
        }),
      builder.addCase(getAllAddress.pending, state => {
        state.status = 'pending';
        state.isLoader = true;
      }),
      builder.addCase(getAllAddress.fulfilled, (state, action) => {
        state.status = 'success';
        state.isLoader = false;
        state.address = action.payload;
        // ToastAndroid.showWithGravity(
        //   action.payload?.message,
        //   ToastAndroid.SHORT,
        //   ToastAndroid.CENTER,
        // );
      }),
      builder.addCase(getAllAddress.rejected, state => {
        state.status = 'rejected';
        state.isLoader = false;
      });
    builder.addCase(deleteAddress.pending, state => {
      state.status = 'pending';
      state.isLoader = true;
    }),
      builder.addCase(deleteAddress.fulfilled, (state, action) => {
        state.status = 'success';
        state.isLoader = false;
        ToastAndroid.showWithGravity(
          action.payload?.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }),
      builder.addCase(deleteAddress.rejected, state => {
        state.status = 'rejected';
        state.isLoader = false;
      });
  },
});

export const {setEditValue} = addressSlice.actions;
export default addressSlice.reducer;
