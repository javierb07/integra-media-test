var mongoose = require("mongoose");

// Define schema
var employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dni: Number,
    dob: Date,
    age: Number,
    employeeID: Number,
});

module.exports = mongoose.model("Employee", employeeSchema);