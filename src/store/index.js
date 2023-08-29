import { configureStore } from "@reduxjs/toolkit";
import emailReducers from './emails'
import authReducers from './auth'
const store=configureStore({reducer:{email:emailReducers,auth:authReducers}})

export default store