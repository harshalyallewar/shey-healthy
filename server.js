const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const usersRoute = require('./routes/usersRoute');

app.use(express.json());
app.use('/api/users', usersRoute);

app.listen('80',()=>{
    
})

