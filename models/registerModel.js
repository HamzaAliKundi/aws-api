const mongoose = require("mongoose");

const RegisterUser = mongoose.Schema(
  {
    fullName: { type: String },
    password: { type: String },
    userName: { type: String },
    gender: { type: String },
    age: { type: Number },
    city: { type: String },
    email: { type: String },
    phone: {type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RegisterUser", RegisterUser);
