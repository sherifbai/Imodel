const mongoose = require("mongoose");
const Model = mongoose.model("Model");

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
    const model = await Model.findOne({ _id: _id, type: "model"}).exec();

    if (!model) {
      return res.json({
        message: "Model not found",
      });
    }

    await Model.updateOne(
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
