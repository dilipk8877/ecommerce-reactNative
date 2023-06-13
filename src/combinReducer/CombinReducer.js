import { combineReducers } from "@reduxjs/toolkit"
import CategoryListingSlice from "../features/categoryListing/CategoryListingSlice"
import ProductListingSlice from "../features/productListing/ProductListingSlice"
import SignupSlice from "../features/signupSlice/SignupSlice"
import LoginSlice from "../features/loginSlice/LoginSlice"
import Wishlist from "../features/wishlist/WishlistSlice"
import AddressSlice from "../features/address/AddressSlice"
import CreateOrder from "../features/address/CreateOrderSlice"

const rootReducer = combineReducers({
    userCategory:CategoryListingSlice,
    userProduct:ProductListingSlice,
    signup:SignupSlice,
    login:LoginSlice,
    address:AddressSlice,
    wishlist:Wishlist,
    createOrder:CreateOrder,

})

export default rootReducer     