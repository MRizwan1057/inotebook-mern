const jwt = require("jsonwebtoken");
const jwtSecret = "MY_SECRET_KEY";

const fetchUser = (req, res, next) => {
  // get the user from jwt and add id to the request object

  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ message: "Invalid token" });
  }
  try {
    const data = jwt.verify(token, jwtSecret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = fetchUser;
