var mongoose = require("mongoose");

// Define schema
var clientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dni: Number,
    dob: Date,
    age: Number,
    creditCard: Number,
});

module.exports = mongoose.model("Client", clientSchema);