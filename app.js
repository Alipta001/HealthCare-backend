require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectedDB = require("./app/config/dbcon");

const homeRoute = require("./app/routes/homeRoutes");
const adminRoute = require("./app/routes/adminRoutes");

const app = express();

connectedDB();

/* CORS */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://doctor-booking-rosy.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Public test route */
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Backend working successfully 🚀",
  });
});

/* Routes */
app.use(homeRoute);
app.use(adminRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});