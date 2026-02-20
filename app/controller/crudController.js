const { postvalidateSchema } = require("../validators/postvalidator");
const CrudMod = require("../model/AdminModel");
const cartModel = require("../../app/model/cartModel");
class CrudController {




  async cart(req, res) {
    try {
      let { name, category, price, ProductId } = req.body;

      let exist = await cartModel.findOne({ name, category, price, ProductId });

      if (exist) {
        exist.quantity += 1;
        await exist.save();
        return res.status(200).json({
          status: true,
          message: "Quantity updated",
          cart: exist,
        });
      }

      const createCart = new cartModel({
        name,
        category,
        price,
        ProductId,
        quantity: 1,
      });
      let saveData = await createCart.save();
      res.status(200).json({
        status: true,
        message: "Item add to cart",
        cart: saveData,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }

  async cartList(req, res) {
    try {
      let dataList = await cartModel.find();
      res.status(200).json({
        status: true,
        message: "cart fetch successfull",
        cart: dataList,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }
}

module.exports = new CrudController();
