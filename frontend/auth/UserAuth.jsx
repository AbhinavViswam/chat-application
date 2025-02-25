import React, { useContext, useEffect } from 'react'
import { userContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from "../config/axios"

function UserAuth({children}) {
    const {setUser} = useContext(userContext)
    const navigate = useNavigate()
    
    const checkAuth = async () => {
          const res = await axios.get('/user/myData',{withCredentials:true});
          const fullname = res.data.user[0].fullname
          const phone = res.data.user[0].phone
          const email = res.data.user[0].email
          setUser({fullname,phone, email})
      };
    useEffect(()=>{
        checkAuth()
    },[navigate])
  return (
    <>{children}</>
  )
}

export default UserAuth