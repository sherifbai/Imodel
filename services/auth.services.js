const mongoose = require("mongoose");
const User = mongoose.model("User");
const Model = mongoose.model("Model")
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const crypto = require("crypto");

const { hash, compare } = require("bcrypt");
const { json } = require("express");

const generateNumber = async function () {
  const number = crypto.randomInt(1000000, 9999999999);
  const code = await User.findOne({ code: number });

  if (!code) {
    return number;
  }

  return generateNumber();
};

exports.register = async (req, res) => {
  try {
    let { phone, password, ref_code, type, name, repeat_password } = req.body;

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
        name: name,
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
      const generated = await generateNumber();
      const code = crypto.randomInt(1000, 9999);

      const newUser = new User({
        type: type,
        phone: phone,
        name: name,
        password: password,
        code: code,
        ref_code: generated,
      });

      await newUser.save();

      res.json({
        message: "User created!",
      });
    } else {
      return res.json({
        message: "da",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.login = async (req, res) => {
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

exports.proof_register = async (req, res) => {
  let { userId, code } = req.body;

  try {
    const model = await Model.findOne({ _id: userId });
    const user = await User.findOne({ _id: userId });

    if (!model && !user) {
      return res.json({
        message: "Model or User do not found",
      });
    }
    if (user) {
      const isEqualCode = user.code == code;

      if (!isEqualCode) {
        return res.json({
          message: "Code did not match",
        });
      }

      user.isPhoneProof = true;

      await user.save();

      res.json({
        message: "Phone was proofed",
      });
    } else if (model) {
      const isEqualCode = model.code == code;

      if (!isEqualCode) {
        return res.json({
          message: "Code did not match",
        });
      }

      model.isPhoneProof = true;

      await model.save();

      res.json({
        message: "Phone was proofed",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      message: "Internal Server Error",
    });
  }
};
