import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createOrder = createAsyncThunk("order/createOrder",async(data,thunkAPI)=>{
    const token = await AsyncStorage.getItem("token");
    try{
        const res = await axiosInstance.post("/order/create-order",data,{
            headers:{
                Authorization: "Bearer " + token
            }
        })
        return res.data
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});

export const updateOrder = createAsyncThunk("order/updateOrder",async(data,thunkAPI)=>{
    const token = await AsyncStorage.getItem("token");
    try{
        const res = await axiosInstance.post("/order/update-order",data,{
            headers:{
                Authorization: "Bearer " + token
            }
        })
        return res.data
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})



export const getOrder = createAsyncThunk(
    'order/getOrder',
    async (id, thunkAPI) => {
      const token = await AsyncStorage.getItem('token');
      try {
        const res = await axiosInstance.get(`/order/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        return res.data
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    },
  );

const initialState ={
    loading:false,
    status: null,
    deliveredAddress:null,
    orderId:null,   
    orderList: []
}

const createOrderSlice = createSlice({
    name: "createOrder",
    initialState,
    reducers:{
        setDeliveredAddress:(state,action)=>{
            state.deliveredAddress = action.payload
        },
    },
    extraReducers:builder =>{
        builder.addCase(createOrder.pending,(state,action)=>{
            state.loading = true
            state.status = "pending"
        }),
        builder.addCase(createOrder.fulfilled,(state,action)=>{
            state.loading = false
            state.orderId=action.payload
            state.status = "fulfilled"
        }),
        builder.addCase(createOrder.rejected,(state,action)=>{
            state.loading = false
            state.status = "rejected"
        })
        builder.addCase(getOrder.pending, (state, action) => {
            state.loading = true;
          }),
            builder.addCase(getOrder.fulfilled, (state, action) => {
              state.loading = false;
              state.orderList = action.payload;
            }),
            builder.addCase(getOrder.rejected, (state, action) => {
              state.loading = false;
            });
    }
})


export const {setDeliveredAddress} = createOrderSlice.actions
export default createOrderSlice.reducer;