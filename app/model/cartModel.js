const { required } = require("joi");
const { type } = require("jquery");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  //   userId: {
  //     type: String,
  //     required: true,
  //   },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  ProductId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("cartModel", cartSchema);
