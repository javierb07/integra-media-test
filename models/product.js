var mongoose = require("mongoose");

// Define schema
var productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    expirationDate: Date,
    price: Date,
    supplier: String,
});

module.exports = mongoose.model("Product", productSchema);