const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    description: String,
    image: String,
    category: { type: String, required: true }
});

// Export the Product model
module.exports = mongoose.model("Product", productSchema);