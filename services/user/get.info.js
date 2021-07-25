const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findOne({ _id: _id , type: "user"}).exec();

    if (!user) {
      return res.json({
        message: "User not found",
      });
    }

    user.password = undefined;

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
