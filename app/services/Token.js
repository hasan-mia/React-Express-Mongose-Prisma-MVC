const jwt = require("jsonwebtoken");

const Token = {};
Token.encode = (payload) => {
  if (payload && typeof payload === "object") {
    return jwt.sign(payload, process.env.PRODUCTION_APP_KEY);
  }
  return false;
};

Token.decode = (jwtToken) => {
  try {
    const decoded = jwt.verify(jwtToken, process.env.PRODUCTION_APP_KEY);
    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = Token;