var mongoose = require("mongoose");

// Define schemas
var invoiceSchema = new mongoose.Schema({
    client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
        },
    employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
        },
    products: [{
        product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                },
        quantity: Number,
        }],
    dateOfPurchase: Date,
    totalPrice: Number,
});

module.exports = mongoose.model("Invoice", invoiceSchema);