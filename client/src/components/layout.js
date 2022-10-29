import { Container } from '@mui/system';
import React, { useState } from 'react'
import '../layout.css'
import CssBaseline from "@mui/material/CssBaseline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Typography, IconButton } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from 'react-redux';

function Layout(props) {

    const [collapsed, setCollapsed] = useState(false);
    const {user} = useSelector((state)=>state.user);
    const Location = useLocation();
    console.log("redux user",user);

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
        name: "Appointments",
        path: "/appointments",
        icon: <ListAltOutlinedIcon sx={iconStyle} />,
      },
      {
        name: "Apply Doctor",
        path: "/apply-doctor",
        icon: <AccountBoxOutlinedIcon sx={iconStyle} />,
      },
      {
        name: "Profile",
        path: "/profile",
        icon: <PersonOutlineOutlinedIcon sx={iconStyle} />,
      },
      {
        name: "Logout",
        path: "/logout",
        icon: <ExitToAppOutlinedIcon sx={iconStyle} />,
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
            path: "/users",
            icon: <ListAltOutlinedIcon sx={iconStyle} />,
          },
          {
            name: "Doctors",
            path: "/doctors",
            icon: <AccountBoxOutlinedIcon sx={iconStyle} />,
          },
          {
            name: "Profile",
            path: "/profile",
            icon: <PersonOutlineOutlinedIcon sx={iconStyle} />,
          },
          {
            name: "Logout",
            path: "/logout",
            icon: <ExitToAppOutlinedIcon sx={iconStyle} />,
          },
        ];

    const menuToBeRendered = user?.isAdmin ? adminMenu :userMenu ;

  return (
    <>
      <Container maxWidth="xl" sx={{ display: "flex", p: {xs:0.7,sm:2} }}>
        <div className="sidebar">
          <div className="sidebarheading">
            <h1>SH</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((obj) => {
              let isActive = Location.pathname === obj.path;

              return (
                <div className={`menuitem ${isActive && "active-menu-item"}`}>
                  {obj.icon}
                  {!collapsed && <Link to={obj.path}>{obj.name}</Link>}
                </div>
              );
            })}
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
                <MenuIcon sx={{ fontSize: "35px" }} />
              ) : (
                <CloseRoundedIcon sx={{ fontSize: "35px" }} />
              )}
            </IconButton>
          </div>

          <div className="body">{props.children}</div>
        </div>
      </Container>
    </>
  );
}

export default Layout;