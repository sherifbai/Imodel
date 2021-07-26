const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = async (req, res) => {
  try {
    const agent = await User.find({type: "agent"}, ["firstName", "rating"]).exec()

    res.json({
      agent: agent,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
