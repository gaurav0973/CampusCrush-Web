import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import feedReducer from "./feedSlice.js"
import connectionReducer from "./connections.js";



const appStore = configureStore({
    reducer:{
        user : userReducer,
        feed : feedReducer,
        connections : connectionReducer
    },
})

export default appStore;