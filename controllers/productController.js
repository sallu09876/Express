const Product = require("../models/ProductModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

/* ---------- Ensure Upload Folder Exists ---------- */
const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* ---------- Multer Config ---------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({ storage });

/* ---------- Show Products ---------- */
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.render("index", { title: "Products", products });
};

/* ---------- Add Product ---------- */
exports.addProduct = async (req, res) => {
  const { name, price, category } = req.body;

  await Product.create({
    name,
    price,
    category,
    image: req.file ? req.file.filename : "", // ✅ SAFE
  });

  res.redirect("/products");
};

/* ---------- Edit Product Page ---------- */
exports.editProductPage = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.redirect("/products");
  res.render("editProduct", { product });
};

/* ---------- Update Product ---------- */
exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.redirect("/products");

  // IF NEW IMAGE UPLOADED
  if (req.file) {
    if (product.image) {
      const oldImagePath = path.join(
        __dirname,
        "../public/uploads",
        product.image,
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    product.image = req.file.filename;
  }

  product.name = req.body.name;
  product.price = req.body.price;
  product.category = req.body.category;

  await product.save();
  res.redirect("/products");
};

/* ---------- Delete Product ---------- */
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.redirect("/products");

  if (product.image) {
    const imagePath = path.join(__dirname, "../public/uploads", product.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await product.deleteOne();
  res.redirect("/products");
};
