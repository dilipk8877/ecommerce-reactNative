import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IState {
    loading: boolean,
    status: string | null,
    deliveredAddress: null,
    orderId: string | null,
    orderList: []
}

interface ICreateOrder{
    name: string,
    amount: number,
    userId: string,
    address: [],
    products: any[],
    testMode: boolean,
  }
interface IUpdateOrder {
    userId: string,
    address: string,
    totalAmount: number,
    status: string,
    paymentId: string,
    testMode: boolean,
}
const initialState: IState = {
    loading: false,
    status: null,
    deliveredAddress: null,
    orderId: null,
    orderList: []
}
export const createOrder = createAsyncThunk("order/createOrder", async (data:ICreateOrder, thunkAPI) => {
    const token = await AsyncStorage.getItem("token");
    try {
        const res = await axiosInstance.post("/order/create-order", data, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const updateOrder = createAsyncThunk("order/updateOrder", async (data: IUpdateOrder, thunkAPI) => {
    const token = await AsyncStorage.getItem("token");
    try {
        const res = await axiosInstance.post("/order/update-order", data, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})



export const getOrder = createAsyncThunk(
    'order/getOrder',
    async (id:string, thunkAPI) => {
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



const createOrderSlice = createSlice({
    name: "createOrder",
    initialState,
    reducers: {
        setDeliveredAddress: (state, action) => {
            state.deliveredAddress = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(createOrder.pending, (state, action) => {
            state.loading = true
            state.status = "pending"
        }),
            builder.addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false
                state.orderId = action.payload
                state.status = "fulfilled"
            }),
            builder.addCase(createOrder.rejected, (state, action) => {
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


export const { setDeliveredAddress } = createOrderSlice.actions
export default createOrderSlice.reducer;