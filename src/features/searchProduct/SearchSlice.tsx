import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/AxiosInstance";
interface SearchProductData {
    title: string;
}

interface ISearchState {
    searchList: any[],
    isLoading: boolean,
}
const initialState: ISearchState = {
    searchList: [],
    isLoading: false,
}

export const searchProduct = createAsyncThunk("seach/searchProduct", async (data: SearchProductData, thunkAPI) => {
    try {
        const res = await axiosInstance.get(`/products/search?title=${data}`)
        return res.data
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(searchProduct.pending, state => {
            state.isLoading = true
        }),
            builder.addCase(searchProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.searchList = action.payload
            }),
            builder.addCase(searchProduct.rejected, state => {
                state.isLoading = false
            })
    }
})

export default searchSlice.reducer