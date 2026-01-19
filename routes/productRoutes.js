const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination directory
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    // Specify the file name
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

// READ
router.get("/", productController.home);

// ADD
router.get("/add", productController.addPage);
router.post("/add", upload.single("image"), productController.addProduct);

// EDIT
router.get("/edit/:id", productController.editPage);
router.post("/edit/:id", productController.updateProduct);

// DELETE
router.get("/delete/:id", productController.deleteProduct);

module.exports = router;
