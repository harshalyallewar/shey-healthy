import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Doctor from "../components/doctor";
import Layout from "../components/layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Home() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getApprovedDocters = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/users/get-all-docters", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(hideLoading());

      if (response.data.success) {
        setDoctors(response.data.data);
      } else {
      }
    } catch {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getApprovedDocters();
  }, []);

  return (
    <Layout>
      <Grid container >
        {doctors.map((doctor, index) => {
          return (
            <Grid key={index} item xs={12} lg={4} sx={{ p: "20px" }}>
              <Doctor doctor={doctor} />
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
}

export default Home;
