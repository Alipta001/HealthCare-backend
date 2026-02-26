const userSchema = require("../model/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {

  async signUp(req, res) {
    try {

      const { email, password, first_name, last_name } = req.body;

      let exist = await userSchema.findOne({ email });

      if (exist) {
        return res.status(400).json({
          status: false,
          message: "User already exists",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      const user = await userSchema.create({
        email,
        password: hash,
        first_name,
        last_name,
        role: "user",
      });

      res.json({
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

  async signIn(req, res) {
    try {

      const { email, password } = req.body;

      let user = await userSchema.findOne({ email });

      if (!user) {
        return res.status(400).json({
          status: false,
          message: "Invalid credentials",
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({
          status: false,
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH,
        { expiresIn: "7d" }
      );

      user.refreshToken = refreshToken;
      await user.save();

      /* Send cookie */
      res.cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "None",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });

      res.json({
        status: true,
        token,
        message: "Login success",
      });

    } catch (err) {

      res.status(500).json({
        status: false,
        message: err.message,
      });

    }
  }

  async refreshToken(req, res) {

    try {

      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(403).json({
          message: "No refresh token",
        });
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH
      );

      const token = jwt.sign(
        { id: decoded.id, role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.json({
        token,
      });

    } catch (err) {

      res.status(403).json({
        message: "Invalid refresh token",
      });

    }
  }

}

module.exports = new AuthController();