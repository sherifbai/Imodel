const mongoose = require("mongoose");
const User = mongoose.model("User");
const Model = mongoose.model("Model");

const crypto = require("crypto");

module.exports = async (req, res) => {
  const { phone } = req.body;

  const user = await User.findOne({ phone: phone }, ["code"]);
  const model = await Model.findOne({ phone: phone }, ["code"]);

  const code = crypto.randomInt(1000, 9999);

  if (user) {
    await User.updateOne({ phone: phone }, { $set: { code: code } }).lean();

    return res.json({
      message: "Code send again",
    });
  } else if (model) {
    await Model.updateOne({ phone: phone }, { $set: { code: code } }).lean();

    return res.json({
      message: "Code send again",
    });
  } else {
    return res.json({
      message: "User or Model with than phone not found",
    });
  }
};
