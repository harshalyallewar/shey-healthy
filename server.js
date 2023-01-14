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
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  //*Set static folder up in production
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => {});

