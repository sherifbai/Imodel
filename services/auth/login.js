const mongoose = require("mongoose");
const User = mongoose.model("User");
const Model = mongoose.model("Model");

const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const { phone, password } = req.body;

    let user = await User.findOne({ phone: phone }).select("+password");
    let model = await Model.findOne({ phone: phone }).select("+password");

    if (!user && !model) {
      return res.status(422).json({
        message: "User with this email does not exist",
      });
    }

    if (user) {
      const isPasswordCorrect = await compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(422).json({
          message: "User with this email or password does not exist",
        });
      }
      user.password = undefined;

      const isPhoneProof = user.isPhoneProof;

      if (!isPhoneProof) {
        return res.json({ status: "Телефон не подтвержден", userId: user._id });
      }

      const jwtToken = jwt.sign(
        {
          user,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.json({
        jwtToken,
        user,
      });
    } else if (model) {
      const isPasswordCorrect = await compare(password, model.password);
      if (!isPasswordCorrect) {
        return res.status(422).json({
          message: "Model with this email or password does not exist",
        });
      }
      model.password = undefined;

      const isPhoneProof = model.isPhoneProof;

      if (!isPhoneProof) {
        return res.json({
          status: "Телефон не подтвержден",
          modelId: model._id,
        });
      }

      const jwtToken = jwt.sign(
        {
          model,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.json({
        jwtToken,
        model,
      });
    } else {
      return res.json({
        message: "User or Model not found",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      message: "Internal Server Error",
    });
  }
};
