import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../utils/AxiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';

interface ProductIntialState {
  product: any[],
  productDetals: any[],
  status: string | null,
  isLoader: boolean,
  cartItem: any[],
  isAddToCart: boolean,
  totalPrice: number
}

const initialState: ProductIntialState = {
  product: [],
  productDetals: [],
  status: null,
  isLoader: false,
  cartItem: [],
  isAddToCart: false,
  totalPrice: 0
};



export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/category/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getProductDetails = createAsyncThunk(
  'product/getProductDetails',
  async (id:string, thunkAPI) => {
    const token = await AsyncStorage.getItem("token")
    try {
      const res = await axiosInstance.get(`/products/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);


export const addToCart = createAsyncThunk(
  'add/addToCard',
  async (data, thunkAPI) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axiosInstance.post('/cart/add', data, {
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

export const getCartItem = createAsyncThunk(
  'get/getCartItem',
  async (userId:string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`cart/${userId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const emptyCart = createAsyncThunk(
  'cart/emptyCart',
  async (id:string, thunkAPI) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axiosInstance.delete(`/cart/all//${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      thunkAPI.dispatch(getCartItem(id));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const removeSingleProduct = createAsyncThunk(
  'cart/removeItem',
  async (data:{id:string,userId:string}, thunkAPI) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axiosInstance.delete(`cart/${data.id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      thunkAPI.dispatch(getCartItem(data.userId));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const incrementItemInCart = createAsyncThunk(
  'cart/incrementItemInCart',
  async (data:{id:string,userId:string,quantity:number}, thunkAPI) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axiosInstance.put(`cart/${data.id}`, { quantity: data.quantity }, {
        headers: {
          Authorization: token,
        },
      });
      thunkAPI.dispatch(getCartItem(data.userId))
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);






const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productReset: state => {
      state.product = [];
    },
    setIsAddToCartTrue: state => {
      state.isAddToCart = true;
    },
    setIsAddToCartFalse: state => {
      state.isAddToCart = false;
    },
    setTotalPrices: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProduct.pending, state => {
      state.status = 'pending';
      state.isLoader = true;
    }),
      builder.addCase(getProduct.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.product = action.payload;
        state.isLoader = false;
      }),
      builder.addCase(getProduct.rejected, (state, action) => {
        state.status = 'rejected';
        state.isLoader = false;
      });
    builder.addCase(getProductDetails.pending, state => {
      state.status = 'pending';
      state.isLoader = true;
    }),
      builder.addCase(getProductDetails.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.productDetals = action.payload;
        state.isLoader = false;
      }),
      builder.addCase(getProductDetails.rejected, (state, action) => {
        state.status = 'rejected';
        state.isLoader = false;
      });
    builder.addCase(addToCart.pending, state => {
      state.status = 'pending';
      state.isAddToCart = false;
      state.isLoader = true;
    }),
      builder.addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isAddToCart = true;
        state.isLoader = false;
        ToastAndroid.showWithGravity(
          action.payload.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
    builder.addCase(addToCart.rejected, state => {
      state.status = 'rejected';
      state.isAddToCart = true;
      state.isLoader = false;
    });
    builder.addCase(getCartItem.pending, state => {
      state.status = 'pending';
      state.isLoader = true;
    }),
      builder.addCase(getCartItem.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isLoader = false;
        state.cartItem = action.payload;
      });
    builder.addCase(getCartItem.rejected, state => {
      state.status = 'rejected';
      state.isLoader = false;
    });
    builder.addCase(removeSingleProduct.pending, state => {
      state.status = 'pending';
      state.isAddToCart = false;
      state.isLoader = true;
    }),
      builder.addCase(removeSingleProduct.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isLoader = false;
        ToastAndroid.showWithGravity(
          action.payload.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
    builder.addCase(removeSingleProduct.rejected, state => {
      state.status = 'rejected';
      state.isLoader = false;
    });
    builder.addCase(emptyCart.pending, state => {
      state.status = 'pending';
      state.isAddToCart = false;
      state.isLoader = true;
    }),
      builder.addCase(emptyCart.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isLoader = false;
        ToastAndroid.showWithGravity(
          action.payload.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
    builder.addCase(emptyCart.rejected, state => {
      state.status = 'rejected';
      state.isLoader = false;
    });
    builder.addCase(incrementItemInCart.pending, state => {
      state.status = 'pending';
      state.isAddToCart = false;
      state.isLoader = true;
    }),
      builder.addCase(incrementItemInCart.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isLoader = false;
      });
    builder.addCase(incrementItemInCart.rejected, state => {
      state.status = 'rejected';
      state.isLoader = false;
    });

  },
});

export const { productReset, setIsAddToCartFalse, setIsAddToCartTrue, setTotalPrices } =
  productSlice.actions;
export default productSlice.reducer;

