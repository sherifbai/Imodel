const mongoose = require('mongoose')

const {
  Schema
} = mongoose

const userSchema = new Schema({
  status: {
    type: String,
    enum: ['active', 'deleted'],
    default: 'active'
  },
  type: {
    type: String,
    enum: ['user', 'agent'],
  },
  code: {
    type: String,
  },
  password: {
    type: String,
  },
  phone:{type:String},
  isPhoneProof: {
    type: Boolean,
    default:false
  }
}, {
  versionKey: false,
  timestamps: true,
}, )

mongoose.model('User', userSchema)