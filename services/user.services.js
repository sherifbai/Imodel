const mongoose = require("mongoose");
const User = mongoose.model("User");
const {
  hash,
  compare
} = require("bcryptjs");

exports.getMyInfo = async (req, res) => {
  try {
    const {
      _id
    } = req.user;
    const user = await User.findById(_id).lean();
    res.json({
      user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};

exports.changeInfo = async (req, res) => {
  try {
    const {
      _id
    } = req.user;
    await User.updateOne({
      _id,
    }, {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    }).lean();
    res.json({
      message: "Пользователь успешно изменён",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
