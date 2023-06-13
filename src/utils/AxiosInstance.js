import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect } from "react";
export const axiosInstance = axios.create({
    baseURL: "https://ecombackend.softprodigyphp.in",
})

// export async function getItem() {
//     try {
//         const value = await AsyncStorage.getItem('token')
//         if(value !== null) {
//           // value previously stored
//           console.log("jehfdjkdhjk",value)
//         }
//       } catch(e) {
//         // error reading value
//       }
//   }
  
// console.log("object",getItem)



export  const authHeader = async()=>{
    const token =await AsyncStorage.getItem('token')
    console.log("objecsrfdst", token)
    return {headers: {
        'Authorization': `Bearer ${token}`,
        Accept: "application/json",
        "Content-type": "application/json",
      }}
}

export const getTokenAccess = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log('Error retrieving token:', error);
    }
  };
