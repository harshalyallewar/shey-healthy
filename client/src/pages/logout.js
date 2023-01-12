import React, { useEffect } from 'react'

function Logout() {


    useEffect(()=>{
        localStorage.clear();
    })
  return (
    <h1>logout</h1>
  )
}

export default Logout