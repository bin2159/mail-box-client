import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authAction } from '../store/auth'

const Logout = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    dispatch(authAction.logout())
    useEffect(()=>{
    navigate('/')

    },[])
}

export default Logout