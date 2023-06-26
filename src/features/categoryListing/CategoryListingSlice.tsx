import {axiosInstance} from '../../utils/AxiosInstance';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const getCategory = createAsyncThunk(
  'category/getCategory',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/category');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState = {
  category: [],
  status: "",
  isLoader: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategory.pending, state => {
      state.status = 'pending';
      state.isLoader = true;
    }),
      builder.addCase(getCategory.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.category = action.payload;
        state.isLoader = false;
      }),
      builder.addCase(getCategory.rejected, (state, action) => {
        state.status = 'rejected';
        state.isLoader = false;
      });
  },
});

export default categorySlice.reducer;
