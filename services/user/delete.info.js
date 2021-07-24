const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findOne({ _id: _id });

    if (!(user.type === "user")) {
      return res.json({
        message: "User not found",
      });
    }

    await User.findByIdAndRemove({ _id: _id });
    res.json({
      message: "Пользователь успешно удален",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
