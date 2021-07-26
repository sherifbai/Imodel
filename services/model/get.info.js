const mongoose = require("mongoose");
const Model = mongoose.model("Model");

module.exports = async (req, res) => {
  const { _id } = req.user;

  try {
    const model = await Model.findOne({ _id: _id, type: "model" });

    if (!model) {
      return res.json({
        message: "Model not found",
      });
    }

    res.json({
      model: model,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
