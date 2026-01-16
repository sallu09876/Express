const Product = require("../models/Product");

module.exports = {
  home: async (req, res) => {
    const products = await Product.find();
    res.render("index", { products });
  }
};
