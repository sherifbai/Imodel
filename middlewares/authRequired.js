const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

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
      if (req.user.type === "agent") {
        const agent = await User.find({ _id: req.user._id, countReferals: { $gt: 9 } }).exec();
        if (!agent.length) {
          return res.json({
            message: "Referals must be greater than 10",
          });
        }
      }
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
