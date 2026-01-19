const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

/* List */
router.get("/", controller.getProducts);

/* Add */
router.get("/add", (req, res) => res.render("addProduct"));
router.post("/add", controller.upload.single("image"), controller.addProduct);

/* Edit */
router.get("/edit/:id", controller.editProductPage);
router.post(
  "/edit/:id",
  controller.upload.single("image"),
  controller.updateProduct,
);

/* Delete */
router.get("/delete/:id", controller.deleteProduct);

module.exports = router;
