import React, { useContext, useEffect } from 'react'
import { userContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from "../config/axios"

function UserAuth({children}) {
    const {user,setUser} = useContext(userContext)
    const navigate = useNavigate()
    
    const checkAuth = async () => {
        console.log("Checking...")
       
          const res = await axios.get('/user/myData',{withCredentials:true});
          console.log(res.data)
        
      };

    useEffect(()=>{
        checkAuth()
    },[navigate,user,setUser])
  return (
    <>{children}</>
  )
}

export default UserAuth