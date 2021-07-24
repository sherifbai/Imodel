const mongoose = require("mongoose");
const Model = mongoose.model("Model");

module.exports = async (req, res) => {
  const { _id } = req.user;

  try {
    const model = await Model.findOne({ _id: _id });

    if (!(model.type === "model")) {
      return res.json({
        message: "Model not found",
      });
    }

    await Model.findByIdAndRemove({ _id: _id });
    res.json({
      message: "Пользователь успешно удален",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
