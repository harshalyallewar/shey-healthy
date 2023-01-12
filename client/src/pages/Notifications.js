import { TabsContext } from '@mui/base'
import React, { useState } from 'react'
import Layout from '../components/layout'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { setUser } from '../redux/userInfo';

function Notifications() {
    const {userDetails} = useSelector((state)=>state.user);
    const [value,setValue] = useState('1');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (event,newValue)=>{
         setValue(newValue);
    };

    const clearAllNotifications = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/users/clear-notifications",
          { userId: userDetails._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());

        if (response.data.success) {
          dispatch(setUser(response.data.data));
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        toast.error("something went wrong");
      }
    };

    const markAsSeen = async()=>{
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/users/mark-as-seen",
          { userId: userDetails._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ); 
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data))
      } else {
        toast.error(response.data.message);
      }

      } catch(error){
        dispatch(hideLoading());
        toast.error("something went wrong");
      }

    }

    const notificationsActionStyle = {
      fontSize: "16px",
      textDecoration: "underline",
      width: "100%",
      textAlign: "end",
      fontWeight: "600",
      cursor: "pointer",
      margin: '0px',
      marginBottom:"20px"
    };

    const h1Style = {
      fontSize: "28px",
      letterSpacing: "1px",
      fontWeight: "600",
      margin: "0px",
      marginBottom: "15px",
    };

  return (
    <Layout>
      <Box>
        <h1
          style={h1Style}
        >
          Notifications
        </h1>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Seen" value="1" />
              <Tab label="Unseen" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ p: "16px" }}>
            <h2
              key={1}
              style={notificationsActionStyle}
              onClick={() => clearAllNotifications()}
            >
              Clear Notifications
            </h2>
            {userDetails?.seenNotifications?.map((notification, index) => {
              return (
                <Paper
                  key={index}
                  sx={{ p: "10px", color: "text.secondary", mb: "3px" }}
                  elevation={1}
                  onClick={() => navigate("/admin/doctorslist")}
                >
                  {notification.message}
                </Paper>
              );
            })}
          </TabPanel>
          <TabPanel value="2" sx={{ px: "9px" }}>
            <h2
              key={2}
              style={notificationsActionStyle}
              onClick={() => markAsSeen()}
            >
              Mark all as seen
            </h2>
            {userDetails?.unseenNotifications?.map((notification, index) => {
              return (
                <Paper
                  key={index}
                  sx={{ p: "10px", color: "text.secondary", mb: "3px" }}
                  elevation={1}
                  onClick={() => navigate("/admin/doctorslist")}
                >
                  {notification.message}
                </Paper>
              );
            })}
          </TabPanel>
        </TabContext>
      </Box>
    </Layout>
  );
}

export default Notifications