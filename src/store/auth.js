import { createSlice } from "@reduxjs/toolkit";

const token=localStorage.getItem('token')
const initialState={login:!!token}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action){
            localStorage.setItem('email',action.payload.email)
            localStorage.setItem('token',action.payload.token)
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