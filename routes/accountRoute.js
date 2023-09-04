const express = require("express");
const router = express.Router();

// **Import From Accounts Controllers
const { login } = require("../controller/loginController");
const { registerNewUser } = require("../controller/registerNewUser");

// **Actual Routes
router.post("/login", login);
router.post("/register", registerNewUser);

module.exports = router;