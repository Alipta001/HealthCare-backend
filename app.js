require("dotenv").config();
const express = require("express");

const path = require("path");
const connectedDB = require("./app/config/dbcon");
const homeRoute = require("./app/routes/homeRoutes");
const adminRoute = require("./app/routes/adminRoutes");
const app = express();
const cookieParser = require("cookie-parser");

const cors = require("cors");

connectedDB();
app.use(cors());
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = 4000;

app.use(express.static(path.join(__dirname, "public")));

app.use(homeRoute);
app.use(adminRoute);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
