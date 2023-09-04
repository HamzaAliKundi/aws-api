const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const connectDB = require("./config/db");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// **Auth Route
app.use("/api/account", require("./routes/accountRoute"));

app.use(errorHandler);
app.listen(port, () => console.log(`Server started at : ${port}`));
