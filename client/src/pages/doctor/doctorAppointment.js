import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
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
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { toast } from "react-hot-toast";
import moment from "moment";

function DoctorAppointments() {
  const [Appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getAppointments = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/users/get-all-appointments-by-userid",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (response.data.success) {
        console.log(response.data);
        setAppointments(response.data.data);
      } else {
        toast.error("failed to get appointment details");
      }
    } catch {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };

  const changeAppointmentstatus = async (app, status) => {
    try {
      dispatch(showLoading());

      const response = await axios.post(
        "/api/doctor/change-appointment-status",
        { appointmentId: app._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (response.data.success) {
        getAppointments();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const h1Style = {
    fontSize: "28px",
    letterSpacing: "1px",
    fontWeight: "600",
    margin: "0px",
    marginBottom: "15px",
  };

  const thcellStyle = {
    letterSpacing: "1px",
    fontWeight: "500",
    fontSize: "16px",
    color: "#242323",
  };

  return (
    <Layout>
      <h1 style={h1Style}>Appointments</h1>

      <TableContainer >
        <Table sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow sx={{ height: "80px" }}>
              <TableCell sx={thcellStyle}>Id</TableCell>
              <TableCell sx={thcellStyle}>Doctor</TableCell>
              <TableCell sx={thcellStyle}>Phone</TableCell>
              <TableCell sx={thcellStyle}>Date & time</TableCell>
              <TableCell sx={thcellStyle}>Status</TableCell>
              <TableCell sx={thcellStyle}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Appointments.map((app, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#242323" }}>{app._id}</TableCell>
                  <TableCell sx={{ color: "#242323" }}>
                    {app.doctorInfo.firstName} {app.doctorInfo.lastName}
                  </TableCell>
                  <TableCell sx={{ color: "#242323" }}>
                    {app.doctorInfo.phoneNumber}
                  </TableCell>
                  <TableCell sx={{ color: "#242323" }}>
                    {moment(app.date).format("YYYY-MM-DD")} {"   "}
                    {moment(app.time).format("HH:mm")}
                  </TableCell>
                  <TableCell sx={{ color: "#242323" }}>
                    {app.status}
                  </TableCell>
                  <TableCell>
                    {app.status === "pending" && (
                      <>
                        <Link
                          sx={{ cursor: "pointer", px: "6px" }}
                          onClick={() =>
                            changeAppointmentstatus(app, "approved")
                          }
                        >
                          Approve
                        </Link>

                        <Link
                          sx={{ cursor: "pointer", px: "6px" }}
                          onClick={() =>
                            changeAppointmentstatus(app, "rejected")
                          }
                        >
                          Reject
                        </Link>
                      </>
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

export default DoctorAppointments;
