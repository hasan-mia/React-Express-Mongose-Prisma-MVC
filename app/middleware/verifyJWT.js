/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({
      message: "Unauthorized access",
    });
  }
  try {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        return res.status(403).send({
          message: "Forbidden access",
        });
      }
      req.decoded = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = verifyJWT;
