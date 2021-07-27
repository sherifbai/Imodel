const mongoose = require("mongoose");
const Order = mongoose.model("Order");

module.exports = async (req, res) => {
  const { _id, type } = req.user;
  const { orderId } = req.body;

  try {
    if (type !== "model") {
      return res.json({
        message: "User cannot take order",
      });
    }

    const order = await Order.findOne({ _id: orderId });

    if (!order) {
      return res.json({
        message: "Order not found",
      });
    }

    await Order.updateOne({ _id: orderId }, { $set: { takenBy: _id } });

    res.json({
      message: "Order taken",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
