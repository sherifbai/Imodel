const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = async (req, res) => {
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

  const { _id } = req.user;

  try {
    const agent = await User.findOne({ _id: _id });

    if (!agent) {
      return res.json({
        message: "Agent not found",
      });
    }

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
