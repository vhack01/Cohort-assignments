const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../index");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  const jwtToken = token.split("")[1];

  if (jwtToken.split(".").length !== 3)
    return res.status(500).json({
      message: "Invalid User",
    });

  const decoded = jwt.verify(jwtToken, JWT_SECRET);
  if (decoded.username && decoded.type === "Admin") next();
  else {
    return res.status(500).json({
      message: "Invalid Admin",
    });
  }
}

module.exports = adminMiddleware;
