const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// READ
router.get("/", productController.home);

// ADD
router.get("/add", productController.addPage);
router.post("/add", productController.addProduct);

// EDIT
router.get("/edit/:id", productController.editPage);
router.post("/edit/:id", productController.updateProduct);

// DELETE
router.get("/delete/:id", productController.deleteProduct);

module.exports = router;
