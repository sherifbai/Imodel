const jwt = require("jsonwebtoken");

module.exports = async function authRequiredMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        errorMessage: "Authorization token is required",
      });
    }
    const token = authHeader.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified.user) {
      req.user = verified.user;
      next();
    } else if (verified.model) {
      req.user = verified.model;
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
