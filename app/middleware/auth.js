const jwt = require("jsonwebtoken");

function checkRole(role) {
  return (req, res, next) => {
    try {
      let token = req.headers.authorization;

      if (!token) {
        return res.status(403).json({
          status: false,
          message: "Access denied. No token provided.",
        });
      }

      // Remove Bearer
      if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      const decoded = jwt.verify(token, "secret_key");

      if (decoded.role !== role) {
        return res.status(403).json({
          status: false,
          message: "Not authorized",
        });
      }

      req.user = decoded;

      next();
    } catch (err) {
      return res.status(401).json({
        status: false,
        message: "Invalid token",
      });
    }
  };
}

module.exports = checkRole;