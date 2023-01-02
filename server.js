const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const usersRoute = require('./routes/usersRoute');

app.use(express.json());
app.use('/api/users', usersRoute);

app.use(
  cors({
    origin: "http://localhost:3000/",
  })
);



app.listen('5000',()=>{
    
})

