const express = require("express");
const AuthController = require("../controller/authController");
const DoctorControllerUser = require("../controller/doctorController");
const router = express.Router();
router.post("/auth/register", AuthController.signUp);
router.post("/auth/login", AuthController.signIn);
router.post("/auth/verify_otp", AuthController.otp);
router.post("/doctor/appointment", DoctorControllerUser.apponintmentCreate);
module.exports = router;
