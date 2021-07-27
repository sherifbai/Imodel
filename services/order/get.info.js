const mongoose = require("mongoose");
const Order = mongoose.model("Order");

module.exports = async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findOne({ _id: orderId });

    if (!order) {
      return res.json({
        message: "Order not found",
      });
    }

    res.json({
      order: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
