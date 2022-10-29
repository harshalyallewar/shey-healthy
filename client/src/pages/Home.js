import axios from 'axios'
import React, { useEffect } from 'react'
import Layout from '../components/layout';

function Home() {

    const getUserInfo = async () => {
      const response = await axios.post(
        "/api/users/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("Bearer " + localStorage.getItem("token"));
    };

    useEffect(()=>{
        getUserInfo();
    }, [])
    
    
  return (
    <Layout>
      <p>home</p>
    </Layout>
  )
}


export default Home;