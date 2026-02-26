require("dotenv").config();
const express = require("express");
const path = require("path");
const connectedDB = require("./app/config/dbcon");
const homeRoute = require("./app/routes/homeRoutes");
const adminRoute = require("./app/routes/adminRoutes");

const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

/* CONNECT DATABASE */
connectedDB();

/* CORS CONFIG — REQUIRED */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://doctor-booking-rosy.vercel.app",
    ],
    credentials: true,
  })
);

/* MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* STATIC */
app.use(express.static(path.join(__dirname, "public")));

/* PUBLIC ROUTE */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "HealthCare Backend API running 🚀",
  });
});

/* ROUTES */
app.use(homeRoute);
app.use(adminRoute);

/* PORT */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});