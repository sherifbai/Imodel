const mongoose = require("mongoose");
const Order = mongoose.model("Order");

module.exports = async (req, res) => {
  const { _id } = req.user;

  try {
    const orders = await Order.find({ orderBy: _id, status: "active" });

    if (!orders.length) {
      return res.json({
        message: "Here is no active orders",
      });
    }

    res.json({
      orders: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
