// const jwt = require("jsonwebtoken");
const sendEmailverificationOtp = require("../helper/sendEmailverification");
const userSchema = require("../model/authModel");
const otpSchema = require("../model/otpModel");
const { regsiterValidate } = require("../validators/authvalidator");
const bcrypt = require("bcrypt");

class AuthController {
  async signUp(req, res) {
    try {
      const { error, value } = regsiterValidate.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details.map((d) => d.message).join(", "),
        });
      }

      const { first_name, last_name, email, address, password } = value;

      const EmailCheck = await userSchema.findOne({ email });
      if (EmailCheck) {
        return res.status(400).json({
          status: false,
          message: "Email Already exist",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const Data = await userSchema.create({
        first_name,
        last_name,
        email,
        address,
        password: hashedPassword,
        is_verified: false,
      });

      await sendEmailverificationOtp(Data);
      // const secret = process.env.JWT_SECRET || "sagnikduttawebskitters";

      // const token = jwt.sign({ id: Data._id, email: Data.email }, secret, {
      //   expiresIn: "1d",
      // });

      res.status(200).json({
        status: true,
        message: "Register successfull and otp send you succesfully",
        data: {
          id: Data._id,
          name: `${Data.first_name} ${Data.last_name}`,
          email: Data.email,
          address: Data.address,
        },
        // token,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }

  async otp(req, res) {
    try {
      const { error, value } = otpSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details.map((item) => item.message).join(),
        });
      }

      const { userId, otp } = value;

      const checkOtp = await otpSchema.findOne({ userId, otp });

      if (!checkOtp) {
        return res.status(400).json({
          status: false,
          message: "Invalid OTP, please request a new one",
        });
      }
    } catch (err) {}
  }
}

module.exports = new AuthController();
