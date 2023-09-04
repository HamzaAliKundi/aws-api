const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const RegisterUser = require("../models/registerModel");

const login = asyncHandler(async (req, res) => {
   const { userName, password } = req.body;

   //  **Checking if user already register with the same email or not
   const userExists = await RegisterUser.findOne({ userName });

   //  **Sending response back to user including JSON_WEB_TOKEN
   if (userExists && (await bcrypt.compare(password, userExists.password))) {
      res.status(200).json({
         _id: userExists.id,
         fullName: userExists.fullName,
         userName: userExists.userName,
         gender: userExists.gender,
         age: userExists.age,
         city: userExists.city,
         email: userExists.email,
         phone: userExists.phone,
         token: generateToken(
            userExists._id,
            userExists.fullName,
            userExists.userName,
            userExists.gender,
            userExists.age,
            userExists.city,
            userExists.email,
            userExists.email,
            userExists.phone
         ),
      });
   } else {
      res.status(400);
      throw new Error("Invalid Credientals");
   }
});

//  **Generating a Token Function
const generateToken = (id, fullName, userName, gender, age, city, email, phone) => {
   return jwt.sign({ id, fullName, userName, gender, age, city, email, phone }, "tokenSecretKey123", {
      expiresIn: "30d",
   });
};

module.exports = {
   login,
};