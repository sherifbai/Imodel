const jwt = require('jsonwebtoken')

module.exports = async function authRequiredMiddleware(req, res, next) {
  try {
    const token = req.headers['authorization'];
    console.log('request')
    if (!token) return res.status(401).json({
      errorMessage: 'Authorization token is required'
    })
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      req.user = verified.user;
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Iternal Server Error'
    })
  }
}