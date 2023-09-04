const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const RegisterUser = require("../models/registerModel");

const registerNewUser = asyncHandler(async (req, res) => {
  const { fullName, password, userName, gender, age, city, email, phone } =
    req.body;

  //  **Checking if user already register with the same email or not
  const userExists = await RegisterUser.findOne({ userName });

  if (userExists) {
    res.status(400);
    throw new Error("Username exists try another one");
  }

  //  **Encrypting password
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  //  **Creating new user
  const newUser = await RegisterUser.create({
    fullName: fullName,
    password: encryptedPassword,
    userName: userName,
    gender: gender,
    age: age,
    city: city,
    email: email,
    phone: phone,
  });

  //  **Sending response back to user including JSON_WEB_TOKEN
  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      gender: newUser.gender,
      age: newUser.age,
      city: newUser.city,
      email: newUser.email,
      phone: newUser.phone,
      token: generateToken(
        newUser._id,
        newUser.fullName,
        newUser.userName,
        newUser.gender,
        newUser.age,
        newUser.city,
        newUser.email,
        newUser.phone
      ),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user Data");
  }
});

//  **Generating a Token Function
const generateToken = (id, fullName, userName, gender, age, city, email, phone) => {
  return jwt.sign({ id, fullName, userName, gender, age, city, email, phone }, "tokenSecretKey123", {
    expiresIn: "30d",
  });
};

module.exports = {
  registerNewUser,
};
