let data = require("../../product.json");
const Model = require("../../app/model/basicModel");
class HomeController {
  async home(req, res) {
    try {
      const user = {
        name: "Nill",
        age: 12,
      };
      res.render("home", {
        title: "home",
        data: user,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async dataApi(req, res) {
    try {
      const response = data.products;
      res.render("data", {
        title: "data",
        data1: response,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async dynamic(req, res) {
    try {
      const response = {
        name: "Nill",
        message: "You are good",
      };
      res.render("dynamic", {
        title: "dynamic",
        dynamic: response,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async about(req, res) {
    try {
      const response = ["nill bhai", "lal", "rupam", "mom"];
      res.render("about", {
        title: "about",
        about: response,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async about_temp(req, res) {
    try {
      res.render("about_temp", {
        title: "About_tmp",
      });
    } catch (err) {}
  }

  async dashboard(req, res) {
    try {
      res.render("dashboard", {
        title: "dashboard",
      });
    } catch (err) {}
  }

  async dataSend(req, res) {
    try {
      const { name, age } = req.body;
      const data = new Model({
        name,
        age: Number(age),
      });
      await data.save();

      res.status(201).json({
        message: "Data saved successfull",
        data,
      });
      console.log(req.body, "res");
    } catch (err) {
      res.status(500).json({
        message: "Error Brother",
      });
    }
  }
}

module.exports = new HomeController();
