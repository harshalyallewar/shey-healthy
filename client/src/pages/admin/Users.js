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

function Users() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(hideLoading());

      if (response.data.success) {
        console.log(response.data);
        setUsers(response.data.data);
      } else {
      }
    } catch {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUsers();
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
      <h1 style={h1Style}>Users List</h1>

      <TableContainer sx={{ height: "520px" }}>
        <Table sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow sx={{ height: "80px" }}>
              <TableCell sx={thcellStyle}>Name</TableCell>
              <TableCell sx={thcellStyle}>Email</TableCell>
              <TableCell sx={thcellStyle}>Created At</TableCell>
              <TableCell sx={thcellStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#242323" }}>
                    {user.name}
                  </TableCell>
                  <TableCell sx={{ color: "#242323" }}>
                    {user.email}
                  </TableCell>
                  <TableCell sx={{ color: "#242323" }}>
                    {user.createdAt}
                  </TableCell>
                  <TableCell>
                    <Link sx={{ cursor: "pointer" }}>Block</Link>
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

export default Users;
