const mongoose = require("mongoose");
const User = mongoose.model("User");
const Model = mongoose.model("Model");

const { hash, compare } = require("bcrypt");

module.exports = async (req, res) => {
  const { password, repeat_password } = req.body;
  const { type, _id } = req.user;
  const isEqual = password === repeat_password;

  if (!isEqual) {
    return res.json({
      message: "Passwords do not match",
    });
  }

  if (type === "model") {
    const model = await Model.findOne({ _id: _id }, ["password"]);

    const isRepeat = await compare(password, model.password);

    if (isRepeat) {
      return res.json({
        message: "Password repeated",
      });
    }

    const hashedPassword = await hash(password, 12);

    await Model.updateOne(
      { _id: _id },
      { $set: { password: hashedPassword } }
    ).lean();

    return res.json({
      message: "Password updated successfully",
    });
  } else if (type === "user" || type === "agent") {
    const user = await User.findOne({ _id: _id }, ["password"]).exec();

    const isRepeat = await compare(password, user.password);

    if (isRepeat) {
      return res.json({
        message: "Password repeated",
      });
    }

    const hashedPassword = await hash(password, 12);

    await User.updateOne(
      { _id: _id },
      { $set: { password: hashedPassword } }
    ).lean();

    return res.json({
      message: "Password updated successfully",
    });
  } else {
    return res.json({
      message: "Undefined type of user",
    });
  }
};
