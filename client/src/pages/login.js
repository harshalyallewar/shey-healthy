import React, { useState, useEffect } from "react";
import { useNavigate , Link} from "react-router-dom";
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
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {showLoading, hideLoading} from '../redux/alertsSlice'
import { setUser } from "../redux/userInfo";

function Login() {

 const dispatch = useDispatch();

  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

      const onFinish = async(values) => {
        if (!email || !password) {
          toast.error("Enter all the details");
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
            "/api/users/login",
            {
              email,
              password,
            }
          );
           dispatch(hideLoading());
        
          if (response.data.success) {
            toast.success(response.data.message);
            toast("redirecting to home page");
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("id", response.data.id);


            navigate("/");
          } else {
            toast.error(response.data.message);
          }
        } catch {
           dispatch(hideLoading());
          toast.error("something went wrong");
        }
      };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    alignItems: "center",
    backgroundColor: "#005555",
  };

  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
   
    m:{xs:'30px',sm:'0px'}
  };

  const textfieldStyle = {
    width: { xs: "260px", sm: "290px", md: "330px" },
    mb: "8px",
  };

  const griditemelemetsStyle = {
    mb: "9px",
    ml: "6px",
    width: "100%",
  };

  const griditemStyle = {
    mb: "8px",
  };

  const hStyle = {
    maxWidth: "max-content",
    margin: "auto",
    fontSize: "22px",
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: "13px",
    color: "white",
    backgroundColor: "#FF5733",
    padding: "9px",
    borderBottomRightRadius: "8px",
    marginRight: "-44px",
  };

  return (
    <div style={containerStyle}>
      <Paper sx={paperStyle}>
        <Grid container sx={{ width: { xs: "100%",sm:'375px' }, p: { xs: "22px" } }}>
          <Grid item xs={12} sx={griditemStyle}>
            <h1 style={hStyle}>Nice to meet you</h1>
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
              sx={{
                width: {xs:'92%',sm:'100%'},
                ":hover": {
                  backgroundColor: "#005555",
                },
                backgroundColor: "#005555",
              }}
              variant="contained"
              size="large"
            >
              Login
            </Button>
            <Link underline="always" to="/signup">
              <Typography sx={{ mt: "15px", fontSize: "17px" }}>
                CLICK HERE TO SIGN UP
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Login;
