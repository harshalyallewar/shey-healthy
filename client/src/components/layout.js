import { Container } from '@mui/system';
import React, { useState } from 'react'
import '../layout.css'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Typography, IconButton, Badge } from "@mui/material";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from 'react-redux';

function Layout(props) {

    const [collapsed, setCollapsed] = useState(false);
    const {userDetails} = useSelector((state)=>state.user);
    const Location = useLocation();
    const navigate = useNavigate();

    const iconStyle = {
         fontSize: "28px" 
    }

    const userMenu = [
      {
        name: "Home",
        path: "/",
        icon: <HomeOutlinedIcon sx={iconStyle} />,
      },
      {
        name: "Appointment",
        path: "/user/appointments/",
        icon: <ListAltOutlinedIcon sx={iconStyle} />,
      },
      {
        name: "Apply Doctor",
        path: "/apply-doctor",
        icon: <AccountBoxOutlinedIcon sx={iconStyle} />,
      },
     
     
    ];

    const doctorMenu = [
      {
        name: "Home",
        path: "/",
        icon: <HomeOutlinedIcon sx={iconStyle} />,
      },
      {
        name: "Appointments",
        path: "/doctor/appointments",
        icon: <ListAltOutlinedIcon sx={iconStyle} />,
      },
     
      {
        name: "Profile",
        path: "/doctor/profile",
        icon: <PersonOutlineOutlinedIcon sx={iconStyle} />,
      },
      
    ];

        const adminMenu = [
          {
            name: "Home",
            path: "/",
            icon: <HomeOutlinedIcon sx={iconStyle} />,
          },
          {
            name: "Users",
            path: "/admin/userslist",
            icon: <ListAltOutlinedIcon sx={iconStyle} />,
          },
          {
            name: "Doctors",
            path: "/admin/doctorslist",
            icon: <AccountBoxOutlinedIcon sx={iconStyle} />,
          },
          {
            name: "Profile",
            path: "/profile",
            icon: <PersonOutlineOutlinedIcon sx={iconStyle} />,
          },
       
        ];

    const menuToBeRendered = userDetails?.isAdmin ? adminMenu : userDetails?.isDoctor ? doctorMenu : userMenu ;

  return (
    <div style={{ height: "100vh", overflowX: "scroll" }}>
      <Container
        maxWidth="xl"
        sx={{ display: "flex", p: { xs: 0.7, sm: 2 }, height: "100%" }}
      >
        <div className={`sidebar ${collapsed && "collapse"}`}>
          <div className="sidebarheading">
            <h1>SH</h1>
            <h1 className="role">
              {userDetails?.isAdmin
                ? "Admin"
                : userDetails?.isDoctor
                ? "Doctor"
                : "User"}
            </h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((obj) => {
              let isActive = Location.pathname === obj.path;

              return (
                <div
                  onClick={() => navigate(obj.path)}
                  key={obj.name}
                  className={`menuitem ${isActive && "active-menu-item"}`}
                >
                  {obj.icon}
                  {!collapsed && (
                    <Link className="menuNamesHiddenInMobile" to={obj.path}>
                      {obj.name}
                    </Link>
                  )}
                </div>
              );
            })}

            <div
              onClick={() => {               
              localStorage.clear();
              

            }}
              key="logout"
              className={`menuitem`}
            >
              <ExitToAppOutlinedIcon sx={iconStyle} />
              {!collapsed && (
                <Link className="menuNamesHiddenInMobile" to='/login'>
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            <IconButton
              variant="text"
              sx={{ color: "black", m: 1 }}
              onClick={() => {
                collapsed ? setCollapsed(false) : setCollapsed(true);
              }}
            >
              {collapsed ? (
                <MenuIcon sx={{ fontSize: "32px" }} />
              ) : (
                <CloseRoundedIcon sx={{ fontSize: "32px" }} />
              )}
            </IconButton>

            <div className="rightside">
              <IconButton onClick={() => navigate("/notifications")}>
                <Badge
                  badgeContent={
                    userDetails != "null"
                      ? userDetails.unseenNotifications.length
                      : 0
                  }
                  color="error"
                >
                  <NotificationsNoneIcon
                    sx={{ color: "black", fontSize: "32px" }}
                  />
                </Badge>
              </IconButton>

              <Link to="/profile" style={{ color: "black" }}>
                {userDetails.name}
              </Link>
            </div>
          </div>

          <div className="body">{props.children}</div>
        </div>
      </Container>
    </div>
  );
}

export default Layout;