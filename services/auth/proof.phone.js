const mongoose = require("mongoose");
const User = mongoose.model("User");
const Model = mongoose.model("Model");

module.exports = async (req, res) => {
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
    } else {
        return res.json({
            message: "Undefined type"
        })
    }
  } catch (e) {
    console.log(e);
    res.json({
      message: "Internal Server Error",
    });
  }
};
