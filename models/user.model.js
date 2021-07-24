const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },
    lastName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    gender: {
      type: String,
    },
    city: {
      type: String,
    },
    region: {
      type: String,
    },
    age: {
      type: String,
    },
    height: {
      type: String,
    },
    hairColor: {
      type: String,
    },
    eyes: {
      type: String,
    },
    shoeSize: {
      type: String,
    },
    dressSize: {
      type: String,
    },
    about: {
      type: String,
    },
    hip: {
      type: String,
    },
    waist: {
      type: String,
    },
    chest: {
      type: String,
    },
    type: {
      type: String,
      enum: ["user", "agent"],
    },
    code: {
      type: String,
    },
    ref_code: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: { type: String },
    isPhoneProof: {
      type: Boolean,
      default: false,
    },
    countReferals: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

mongoose.model("User", userSchema);
