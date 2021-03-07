'Use Strict' // Code should be executed in "strict mode" to make it easier to write better JavaScript

// Import required libraries
const   express        = require('express'),
        path           = require('path'),
        mongoose       = require('mongoose'),
        bodyParser     = require('body-parser'),
        methodOverride = require('method-override'),
        dotenv         = require('dotenv');

// Required API routes
const   clientsRoutes   = require("./routes/clients"),
        employeesRoutes = require("./routes/employees"),
        productsRoutes  = require("./routes/products"),
        invoicesRoutes  = require("./routes/invoices");

dotenv.config(); // Configure environment variables

// Set up default mongoose connection
const host = process.env.HOST || `mongodb://localhost:${process.env.PORTDB}/integra-media`;
console.log(host);
mongoose.connect(host,{ useNewUrlParser: true ,useUnifiedTopology: true}, function(err){
    if (err){
        console.log("Conection error to database")
    } else {
        console.log("Connected to database")
    }
});
// Get the default connection
const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// App configuration
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/build')));
app.use(methodOverride('_method'));

// API RESTful routes
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/invoices", invoicesRoutes);

// Catch all other routes to serve the client
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

// Start the server
const PORT = process.env.PORT || 80;
app.listen(PORT, (err) => {
    if (err){
        console.log("Something went wrong.");
    } else {
        console.log("Server is running.");
    }
});
