import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../components/layout";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TimePicker from "react-time-picker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import moment from "moment";

function BookAppointments() {
  const [time, setTime] = useState("12:00");
  const [date, setDate] = useState("");
  const [isAvailable, setisAvailable] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const { userDetails } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  
  const bookAppointment = async () => {
    try {
      const response = await axios.post(
        "/api/doctor/book-appointment",
        {
          doctorId: params.doctorId,
          userId: userDetails._id,
          time,
          date,
          doctorInfo: doctor,
          userInfo: userDetails,
          status:'pending'
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setisAvailable(false)
        toast.success("Succesfully booked for doctor appointment");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log("error occured in booking appointment");
      toast.error("something went wrong");
    }
  };

  const checkAppointment = async () => {
    try {
      const response = await axios.post(
        "/api/doctor/check-appointment",
        {
          doctorId: params.doctorId,
          time,
          date
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setisAvailable(true);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log("error occured in booking appointment");
      toast.error("something went wrong");
    }
  };

  const getDoctorInfo = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (response.data.success) {
        const res = response.data.data;
        console.log(res)
        setDoctor(res);
      } else {
        toast.error("error in getting doctor info, please try again");
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log("error occured in getting doctor info");
    }
  };

  useEffect(() => {
    const d = new Date();
    setDate(`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`);
    getDoctorInfo();
  }, []);

  return (
    <Layout>
      <Grid container sx={{ p: "10px" }}>
        <Grid item xs={12}>
          <Typography variant="h2" sx={{ fontSize: "27px", fontWeight: "400" }}>
            {doctor?.firstName} {doctor?.lastName}
          </Typography>
          <hr />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography
            variant="h5"
            sx={{ mb: "28px", fontSize: "18px", fontWeight: "400" }}
          >
            Timings :{" "}
            <Typography
              sx={{ display: "inline", fontSize: "16px", fontWeight: "400" }}
            >
              {doctor?.startTime}{" - "} {doctor?.endTime}
            </Typography>
          </Typography>
          <Box>
            <TextField
              size="small"
              label="Select Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 220, mb: "22px" }}
              onChange={(val) => {
                setDate(moment(val.target.value).format("DD-MM-YYYY"));
                setisAvailable(false);
              }}
            />

            <TextField
              size="small"
              defaultValue={time}
              label="Select Time"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 220, mb: "22px" }}
              onChange={(val) => {
                setTime(val.target.value);
                setisAvailable(false);
              }}
            />

            {isAvailable ? (
              <Button
                variant="contained"
                sx={{
                  display: "block",
                  width: 220,
                  mb: "22px",
                  textTransform: "none",
                  ":hover": {
                    backgroundColor: "#005555",
                  },
                  backgroundColor: "#005555",
                  letterSpacing: "0.7px",
                  fontWeight: "400",
                }}
                onClick={bookAppointment}
              >
                Book
              </Button>
            ) : (
              <Button
                onClick={checkAppointment}
                variant="contained"
                sx={{
                  display: "block",
                  width: 220,
                  mb: "22px",
                  textTransform: "none",
                  ":hover": {
                    backgroundColor: "#005555",
                  },
                  backgroundColor: "#005555",
                  letterSpacing: "0.7px",
                  fontWeight: "400",
                }}
              >
                Check Availability
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default BookAppointments;
