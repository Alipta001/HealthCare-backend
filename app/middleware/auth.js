const jwt = require("jsonwebtoken");

function checkRole(role) {
  return (req, res, next) => {
    let token =
      req.cookies.token ||
      req.headers["x-access-token"] ||
      req.headers["authorization"];

    if (!token) {
      return res.status(403).json({
        status: false,
        message: "Access denied. No token provided.",
      });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: false,
          message: "Invalid token",
        });
      }

      if (decoded.role !== role) {
        return res.status(403).json({
          status: false,
          message: "Not authorized",
        });
      }

      req.user = decoded;
      next();
    });
  };
}

module.exports = checkRole;