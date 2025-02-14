const jwt = require("jsonwebtoken");

const authMiddleWare = async (req, res, next) => {
  const authHeadaer = req.headers.authorization;

  if (!authHeadaer) {
    return res.status(401).json({
      message: "Please provide a token",
    });
  } else {
    const token = authHeadaer.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken;

      next();
    } catch (error) {
      return res.status(403).json({
        message: "Forbidden: Invalid or expired token",
        // error: error.message,
      });
    }
  }
};

module.exports = authMiddleWare;
