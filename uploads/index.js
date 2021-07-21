const multer = require("multer");
const fs = require('fs')

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "files/");
  },
  filename: function(req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    file.originalname = file.fieldname + "-" + Date.now() + "." + extension;
    cb(null, file.originalname);
  },
});

exports.upload = multer({
  storage: storage
});