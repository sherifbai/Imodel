const mongoose = require("mongoose");
const User = mongoose.model("User");
const { hash, compare } = require("bcryptjs");

exports.getAgents = async (req, res) => {
  try {
    let objects = await User.find();

    const agent = [];

    objects.map((el) => {
      if (el.type === "agent") {
        return agent.push(el);
      }
    });

    res.json({
      agent: agent,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};

exports.getMyInfo = async (req, res) => {
  const { _id } = req.params;

  try {
    const user = await User.findOne({ _id: _id });

    res.json({
      user: user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};

exports.changeInfo = async (req, res) => {
  const {
    lastName,
    firstName,
    gender,
    city,
    region,
    age,
    height,
    hairColor,
    eyes,
    shoeSize,
    dressSize,
    about,
    hip,
    waist,
    chest,
  } = req.body;

  const { _id } = req.params;

  try {
    await User.updateOne(
      {
        _id,
      },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          city: city,
          region: region,
          age: age,
          height: height,
          hairColor: hairColor,
          eyes: eyes,
          shoeSize: shoeSize,
          dressSize: dressSize,
          about: about,
          hip: hip,
          waist: waist,
          chest: chest,
        },
      }
    ).lean();
    res.json({
      message: "Пользователь успешно изменён",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};

exports.deleteAgentProfile = async (req, res) => {
  const { _id } = req.params;

  try {
    await User.findByIdAndRemove({ _id: _id });
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

exports.checkMyRef = async (req, res) => {
  const { _id } = req.params;

  try {
    const user = await User.findOne({ _id: _id });

    const ref_count = user.countReferals;

    res.json({
      ref_count: ref_count,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Iternal Server Error",
    });
  }
};
