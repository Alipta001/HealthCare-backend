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

/* ✅ FIXED CORS */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://health-care-frontend.vercel.app", // change to your frontend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-access-token"],
    credentials: true,
  })
);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 4000;

/* Public route */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "HealthCare Backend API is running 🚀",
  });
});

/* Routes */
app.use(homeRoute);
app.use(adminRoute);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});