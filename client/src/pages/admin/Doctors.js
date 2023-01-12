import { height } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Layout from '../../components/layout'
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
} from "@mui/material";
import { toast } from 'react-hot-toast';

function Doctors() {
  const[doctors,setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDocters = async ()=>{
    try {
      dispatch(showLoading())
      const response = await axios.get(
        "/api/admin/get-all-docters",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if(response.data.success){
        setDoctors(response.data.data);
      } else {

      }
    } catch {
        dispatch(hideLoading())
    }
  }

  const changeDoctorAccountstatus = async (doctor, status)=>{
        try {
          dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-doctor-account-status",
        {
          doctorId:doctor._id,status
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if(response.data.success){
        getDocters();
        console.log(response.data.data)
        toast.success("Succesfully changed status for doctor account");
      } else {
        toast.error("error in changing status, please try again");
      }
    } catch(err) {
      dispatch(hideLoading());
        console.log("error occured in changing status of doctor account")
    }
  };
  


  useEffect(()=>{
      getDocters();
  },[])

  const thcellStyle = {
    letterSpacing: "1px",
    fontWeight: "500",
    fontSize: "16px",
    color: "#242323",
  };

  const h1Style = {
          fontSize: "28px",
          letterSpacing: "1px",
          fontWeight: "600",
          margin: "0px",
          marginBottom: "15px",
        }

  return (
    <Layout>
      <h1 style={h1Style}>Doctors List</h1>

      <TableContainer sx={{ height: "520px" }}>
        <Table sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow sx={{ height: "80px" }}>
              <TableCell sx={thcellStyle}>Name</TableCell>
              <TableCell sx={thcellStyle}>Phone</TableCell>
              <TableCell sx={thcellStyle}>Created At</TableCell>
              <TableCell sx={thcellStyle}>status</TableCell>
              <TableCell sx={thcellStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#242323" }}>
                    {doctor.firstName} {doctor.lastName}
                  </TableCell>
                  <TableCell sx={{ color: "#242323" }}>
                    {doctor.phoneNumber}
                  </TableCell>
                  <TableCell sx={{ color: "#242323" }}>
                    {doctor.createdAt}
                  </TableCell>
                  <TableCell sx={{ color: "#242323" }}>
                    {doctor.status}
                  </TableCell>

                  <TableCell>
                    {doctor.status === "pending" && (
                      <Link
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          changeDoctorAccountstatus(doctor, "approved")
                        }
                      >
                        Approve
                      </Link>
                    )}
                    {doctor.status === "approved" && (
                      <Link
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          changeDoctorAccountstatus(doctor, "blocked")
                        }
                      >
                        Block
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export default Doctors