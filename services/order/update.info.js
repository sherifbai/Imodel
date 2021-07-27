const mongoose = require("mongoose");
const Order = mongoose.model("Order");

module.exports = async (req, res) => {
  const {
    orderId,
    title,
    city,
    district,
    category,
    deadline,
    budget,
    description,
  } = req.body;

  try {
    const order = await Order.findOne({ _id: orderId });

    if (order.status === "completed") {
      return res.json({
        message: "Order completed",
      });
    }

    await Order.updateOne(
      { _id: orderId },
      {
        $set: {
          title: title,
          city: city,
          district: district,
          category: category,
          deadline: deadline,
          budget: budget,
          description: description,
        },
      }
    );

    res.json({
        message: "Order updated successfully"
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
