const mongoose = require("mongoose");
const User = mongoose.model("User");
const Model = mongoose.model("Model");

const { hash, compare } = require("bcrypt");

module.exports = async (req, res) => {
  const { phone, password, repeat_password } = req.body;
  const isEqual = password === repeat_password;

  if (!isEqual) {
    return res.json({
      message: "Passwords do not match",
    });
  }

  const user = await User.findOne({ phone: phone });
  const model = await Model.findOne({ phone: phone });

  if (model) {
    const isRepeat = await compare(password, model.password);

    if (isRepeat) {
      return res.json({
        message: "Password repeated",
      });
    }

    const hashedPassword = await hash(password, 12);

    await Model.updateOne(
      { phone: phone },
      { $set: { password: hashedPassword } }
    ).lean();

    return res.json({
      message: "Password updated successfully",
    });
  } else if (user) {
    const isRepeat = await compare(password, user.password);

    if (isRepeat) {
      return res.json({
        message: "Password repeated",
      });
    }

    const hashedPassword = await hash(password, 12);

    await User.updateOne(
      { phone: phone },
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
