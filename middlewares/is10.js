const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = async (req, res, next) => {
  try {
    let objects = await User.find();

    const agent = [];

    objects.map((el) => {
      if (el.type === "agent") {
        return agent.push(el);
      }
    });

    agent.forEach((el) => {
      if (el.countReferals <= 10) {
        res.json({
          message: "Your ref_count must be greater than 10",
        });
      }
    });

    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
