const mongoose = require("mongoose");
const User = mongoose.model("User");
const Model = mongoose.model("Model");

const { hash } = require("bcrypt");
const crypto = require("crypto");

const generateNumber = async function () {
  const number = crypto.randomInt(1000000, 9999999999);
  const ref_code = await User.findOne({ ref_code: number });

  if (!ref_code) {
    return number;
  }

  return generateNumber();
};

module.exports = async (req, res) => {
  try {
    let { phone, password, ref_code, type, repeat_password } = req.body;

    const modelWithSamePhone = await Model.findOne({ phone: phone });
    const userWithSamePhone = await User.findOne({ phone: phone });

    if (userWithSamePhone || modelWithSamePhone) {
      return res.status(409).json({
        message: "Agent, User or Model with this phone already exists",
      });
    }

    const isEqualPassword = password === repeat_password;

    if (!isEqualPassword) {
      return res.status(409).json({
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await hash(password, 12);
    password = hashedPassword;

    if (type === "model") {
      const invitedBy = await User.findOne({ ref_code: ref_code });

      if (!invitedBy) {
        return res.status(404).json({
          message: "User with that ref_code does not found",
        });
      }

      const code = crypto.randomInt(1000, 9999);

      const newModel = new Model({
        type: type,
        phone: phone,
        code: code,
        password: hashedPassword,
        invitedBy: invitedBy._id,
      });

      await newModel.save();

      invitedBy.countReferals += 1;

      await invitedBy.save();

      res.json({
        message: "Model created",
      });
    } else if (type === "agent" || type === "user") {
      let generated = undefined;
      let countReferals = undefined;

      if (type === "agent") {
        generated = await generateNumber();
        countReferals = 0;
      }

      const code = crypto.randomInt(1000, 9999);

      const newUser = new User({
        type: type,
        phone: phone,
        password: password,
        code: code,
        ref_code: generated,
        countReferals: countReferals,
      });

      await newUser.save();

      res.json({
        message: "User created!",
      });
    } else {
      return res.json({
        message: "Undefined type",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
