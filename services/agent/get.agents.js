const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = async (req, res) => {
  try {
    let objects = await User.find();

    const agent = [];

    objects.map((el) => {
      if (el.type === "agent") {
        el.password = undefined;
        return agent.push(el);
      }
    });

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
