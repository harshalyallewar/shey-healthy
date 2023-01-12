const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const usersRoute = require('./routes/usersRoute');
const adminRoute = require('./routes/adminRoutes');
const doctorRoutes = require("./routes/doctorRoutes");

app.use(express.json());
app.use('/api/users', usersRoute);
app.use('/api/admin', adminRoute);
app.use('/api/doctor', doctorRoutes);

app.use(
  cors({
    origin: "*"
  })
);



app.listen('5000',()=>{
    
})

