const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const Model = mongoose.model("Model");

module.exports = async (req, res) => {
  const { rated } = req.body;
  const { _id } = req.user;
  let sum = 0;

  try {
    const order = await Order.findOne({ orderBy: _id }, ["takenBy", "status"]);
    const model = await Model.findOne({ _id: order.takenBy }, [
      "rated",
      "rating",
    ]);

    if (order.status === "completed") {
      return res.json({
        message: "Order was completed",
      });
    }

    if (!order || !model) {
      return res.json({
        message: "Order or Model not found",
      });
    }

    model.rated.push(rated);

    model.rated.map((el) => {
      sum = sum + el;
      return sum;
    });

    model.rating = sum / model.rated.length;

    model.save();

    await Order.updateOne({ orderBy: _id }, { $set: { status: "completed" } });

    res.json({
      message: "Order is complete",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
