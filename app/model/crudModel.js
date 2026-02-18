const mongoose = require("mongoose");
const crudModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  //   userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Crud",
  //     required: true,
  //   },
});

module.exports = mongoose.model("CrudMod", crudModel);
