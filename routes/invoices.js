const   express  = require("express"),
        router   = express.Router(),
        Employee = require("../models/employee"),
        Client   = require("../models/client"),
        Product  = require("../models/product"),
        Invoice  = require("../models/invoice");



module.exports = router;