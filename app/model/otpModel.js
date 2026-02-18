const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("otpSchema", otpSchema);
