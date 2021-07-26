const mongoose = require("mongoose");
const Model = mongoose.model("Model");

module.exports = async (req, res) => {
  try {
    const models = await Model.find({}, ["firstName", "rating"]);

    res.json({
      models: models,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
