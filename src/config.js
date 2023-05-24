require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  myKey: process.env.MY_API_KEY,
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
};
