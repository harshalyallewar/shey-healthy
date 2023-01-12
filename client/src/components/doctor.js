import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

function Doctor({ doctor }) {

  const navigate = useNavigate();

  const rightStyle = { color: "#3b3a3a", p: "1px", fontSize: "15px" };
  const leftStyle = {
    display: "inline",
    color: "#030202",
    fontWeight: "500",
    fontSize: "15px",
    letterSpacing:'0.6px'
  };

 

  return (
    <Card sx={{cursor:'pointer'}} onClick={()=> navigate(`/book-appointment/${doctor._id}`)}>
      <CardContent>
        <Typography
          sx={{letterSpacing:'0.5px', fontSize: "23px", fontWeight: "550", color: "#292828" }}
        >
          {doctor.firstName} {doctor.lastName}
        </Typography>
        <hr />

        <Typography sx={rightStyle}>
          <p style={leftStyle}>Specialization : </p>
          {doctor.specialization}
        </Typography>

        <Typography sx={rightStyle}>
          <p style={leftStyle}>Experience : </p>
          {doctor.experience}
        </Typography>

        <Typography sx={rightStyle}>
          <p style={leftStyle}>Fee Per Visit : </p>
          {doctor.feePerConsultation}
        </Typography>

        <Typography sx={rightStyle}>
          <p style={leftStyle}>Address : </p>
          {doctor.address}
        </Typography>

        <Typography sx={rightStyle}>
          <p style={leftStyle}>Timings : </p>
          {doctor.startTime} - {doctor.endTime}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Doctor;
