import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import {
  Paper,
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  TextField,
  Container,
  Grid,
  Avatar,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";

import { Toaster,toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function Signup() {
  const dispatch = useDispatch();

    const [password, setPass] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [err, setErr] = useState(false);
    const [errmsg, setErrmsg] = useState("");
    const navigate = useNavigate();

    const onFinish = async (values)=>{
      if (!name || !email || !password) {
        toast.error("Enter all details");
        return;
      }

      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!email.match(mailformat)) {
        toast.error("Please enter valid email");

        return;
      }
      
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/users/register",
          { name, email, password }
        );

        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          toast("redirecting to login page");
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch {
        dispatch(hideLoading());
        toast.error("something went wrong");
      }
        
    }


    const containerStyle = {
      display: "flex",
      justifyContent: "center",
      height: "100vh",
      width:'100vw',
      alignItems: "center",
      backgroundColor:'#005555',
      
    };

    const paperStyle = {
      
      display: "flex",
      flexDirection:'column',
      justifyContent: "center",
      alignItems: "center",
    };

    const textfieldStyle = {
      width: { xs: "260px", sm: "290px", md: "330px" },
      mb: "8px"
    };

    const griditemelemetsStyle = {
      mb: "9px",
      ml: "6px",
      width:'100%'
    };

    const griditemStyle = {
        mb: '8px'
    }

    const h1Style = {
      maxWidth: "max-content",
      margin: "auto",
      fontSize: "22px",
      fontWeight: "600",
      letterSpacing: 1,
      marginBottom: "13px",
      color: "white",
      backgroundColor: "#FF5733",
      padding: "9px",
      borderBottomLeftRadius: "8px",
      marginLeft: "-44px",
    };

    const btnStyle = {
      width: "100%",
      backgroundColor: "#005555",
      ":hover": {
        backgroundColor: "#005555",
      },
    }; 

  return (
    <div style={containerStyle}>
      <Paper sx={paperStyle}>
        <Grid
          component="form"
          container
          sx={{ width: { xs: "375px" }, p: { xs: "22px" } }}
        >
          <Grid item xs={12} sx={griditemStyle}>
            <h1 style={h1Style}>Nice to meet you</h1>
          </Grid>
          <Grid item xs={6} sx={griditemStyle}>
            <Typography sx={griditemelemetsStyle}>Enter Name</Typography>
            <TextField
              value={name}
              size="small"
              required
              sx={textfieldStyle}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={griditemStyle}>
            <Typography sx={griditemelemetsStyle}>Enter Email</Typography>
            <TextField
              value={email}
              size="small"
              type="email"
              required
              sx={textfieldStyle}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={griditemStyle}>
            <Typography sx={griditemelemetsStyle}>Enter Password</Typography>
            <TextField
              value={password}
              size="small"
              required
              sx={textfieldStyle}
              onChange={(e) => setPass(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ mr: "10px" }}>
            <Button
              onClick={onFinish}
              sx={btnStyle}
              variant="contained"
              size="large"
            >
              Register
            </Button>
            <Link underline="always" to="/login">
              <Typography sx={{ mt: "15px", fontSize: "17px" }}>
                CLICK HERE TO LOGIN
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Signup;
