const mongoose = require("mongoose");
const Order = mongoose.model("Order");

module.exports = async (req, res) => {
  const { title, city, district, category, deadline, budget, description } =
    req.body;
  const { _id } = req.user;

  try {
    const order = new Order({
      title: title,
      city: city,
      district: district,
      category: category,
      deadline: deadline,
      budget: budget,
      description: description,
      orderBy: _id,
    });

    await order.save();

    res.json({
      message: "Order created",
    });
    P;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
