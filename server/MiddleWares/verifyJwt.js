const jwt = require("jsonwebtoken");
const verifyJwt = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res.send({ auth: false, message: "WE need a token" });
  }

  jwt.verify(token, "jwtSecret", (err, decoded) => {
    if (err) {
      res.send({ auth: false, message: "U failed to authenticate" });
    } else {
      req.sellerId = decoded.id;
      next();
    }
  });
};

module.exports = verifyJwt;
