import { createSlice } from "@reduxjs/toolkit";

const token=localStorage.getItem('token')
const initialState={login:!!token}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action){
            console.log(action.payload)
            localStorage.setItem('email',action.payload.email)
            localStorage.setItem('token',action.payload.token)
            state.login=true
        },
        logout(state){
            localStorage.removeItem('email')
            localStorage.removeItem('token')
            state.login=false
        }
    }
})
export default authSlice.reducer
export const authAction=authSlice.actions