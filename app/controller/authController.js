const sendEmailverificationOtp = require("../helper/sendEmailverification");
const userSchema = require("../model/authModel");
const Otp = require("../model/otpModel");
const { otpValidate, regsiterValidate, loginvalidate } = require("../validators/authvalidator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {

  /* REGISTER */
  async signUp(req, res) {
    try {
      const { error, value } = regsiterValidate.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details.map(d => d.message).join(", "),
        });
      }

      const { first_name, last_name, email, address, password } = value;

      const existing = await userSchema.findOne({ email });

      if (existing) {
        return res.status(400).json({
          status: false,
          message: "Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userSchema.create({
        first_name,
        last_name,
        email,
        address,
        password: hashedPassword,
        role: "user",
        is_verified: true,
      });

      res.status(200).json({
        status: true,
        message: "Registration successful",
      });

    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }

  /* LOGIN */
  async signIn(req, res) {
    try {
      const { error, value } = loginvalidate.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details.map(d => d.message).join(", "),
        });
      }

      const { email, password } = value;

      const user = await userSchema.findOne({ email });

      if (!user) {
        return res.status(401).json({
          status: false,
          message: "Invalid email or password",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Invalid email or password",
        });
      }

      /* ACCESS TOKEN */
      const token = jwt.sign(
        { id: user._id, role: user.role },
        "secret_key",
        { expiresIn: "5m" }
      );

      /* REFRESH TOKEN */
      const refreshToken = jwt.sign(
        { id: user._id, role: user.role },
        "secret_refresh",
        { expiresIn: "7d" }
      );

      user.refreshToken = refreshToken;
      await user.save();

      /* SET COOKIE */
      res.cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "None",
        maxAge: 5 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        status: true,
        message: "Login successful",
        token,
      });

    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }

}

module.exports = new AuthController();