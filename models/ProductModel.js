const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    description: String,
    image: String
});

// Export the Product model
mondule.exports = mongoose.model("Product", productSchema);