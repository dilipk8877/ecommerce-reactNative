import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/AxiosInstance";

export const searchProduct = createAsyncThunk("seach/searchProduct",async(data,thunkAPI)=>{
    try{
        const res = await axiosInstance.get(`/products/search?title=${data}`)
        return res.data
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const initialState ={
    searchList:[],
    isLoading:false,
}
const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(searchProduct.pending,state=>{
            state.isLoading = true
        }),
        builder.addCase(searchProduct.fulfilled,(state,action)=>{
            state.isLoading = false
            state.searchList = action.payload
        }),
        builder.addCase(searchProduct.rejected,state=>{
            state.isLoading = false
        })
    }
})

export default searchSlice.reducer