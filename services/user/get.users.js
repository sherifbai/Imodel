const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = async (req, res) => {
  try {
    const user = await User.find({ type: "user" }).exec();

    res.json({
      user: user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
