const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection;

connection.on('connected',()=>{
    console.log("mongodb is conencted");
});

connection.on('error',(err)=>{
    console.log("mongodb is not get conencted", err);
});

module.exports = mongoose;