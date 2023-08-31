import { createSlice } from "@reduxjs/toolkit";

const token=localStorage.getItem('token')
const email=localStorage.getItem('email')?localStorage.getItem('email').replace(/[@.]/g,""):null
const initialState={login:!!token,email}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action){
            localStorage.setItem('email',action.payload.email)
            localStorage.setItem('token',action.payload.token)
            state.email=action.payload.email.replace(/[@.]/g,"")
            state.login=true
        },
        logout(state){
            state.login=false
            localStorage.removeItem('email')
            localStorage.removeItem('token')
        }
    }
})
export default authSlice.reducer
export const authAction=authSlice.actions