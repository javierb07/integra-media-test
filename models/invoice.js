var mongoose = require("mongoose");

// Define schemas
var invoiceSchema = new mongoose.Schema({
    client: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
        },
        firstName: String,
        lastName: String,
    },
    employee: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
        },
        firstName: String,
        lastName: String,
        employeeID: Number,
    },
    products: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        name: String,
        unitPrice: Number,
        Quantity: Number,
        totaProductPrice: Number,
        dateOfPurchase: Date,
    }],
    totalPrice: Number,
});

module.exports = mongoose.model("Invoice", invoiceSchema);