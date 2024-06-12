import React from 'react'
import { useEffect } from 'react'

import {  useNavigate } from 'react-router-dom';

export default function Signout() {
    const navigate = useNavigate();
    useEffect(()=>{
        fetch('http://localhost:3001/signout',{
            method:'GET',
            headers: {
                accept: 'application/json',
                "Content-Type": 'application/json'
              },
              credentials: 'include'
        }).then((res)=>{
            navigate('/login')
            if(!res.status===200){
                throw error=new Error(res.error)
            }
        }).catch((error)=>{
            console.log(error)
        })
    })
  return (
    <div>Signout</div>
  )
}
