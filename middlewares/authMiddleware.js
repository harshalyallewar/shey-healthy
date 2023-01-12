const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "auth failed token invalid", success: false });
      } else {
        req.body.userid = decoded.id;
        next();
      }
    });
  } catch (err) {
    res.status(401).send({ message: "auth failed catched", success: false ,err});
  }
};
