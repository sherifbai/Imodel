const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = async (req, res) => {
  const { _id } = req.user;

  try {
    const agent = await User.findOne({ _id: _id , type: "agent"}).exec();

    if (!agent) {
      return res.json({
        message: "Agent not found"
      });
    }

    const ref_count = agent.countReferals;

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
