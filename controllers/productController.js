const Product = require("../models/ProductModel");

// SHOW ALL PRODUCTS
exports.home = async (req, res) => {
  const products = await Product.find();
  res.render("index", {
    title: "Products",
    products,
  });
};

// ADD PAGE
exports.addPage = (req, res) => {
  res.render("addProduct", {
    title: "Add Product",
  });
};

// ADD PRODUCT
exports.addProduct = async (req, res) => {
  await Product.create(req.body);
  res.redirect("/products");
};

// EDIT PAGE
exports.editPage = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("editProduct", {
    title: "Edit Product",
    product,
  });
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/products");
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
};

// Search by name OR category (case-insensitive)
exports.home = async (req, res) => {
  let query = {};
  if (req.query.search_text) {
    const search = req.query.search_text;
    query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    };
  }

  const products = await Product.find(query);
  res.render("index", {
    title: "Products",
    products,
  });
};
