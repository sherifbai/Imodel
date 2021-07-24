const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = async (req, res) => {
  try {
    let objects = await User.find();

    const user = [];

    objects.map((el) => {
      if (el.type === "user") {
        el.password = undefined;
        return user.push(el);
      }
    });

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
