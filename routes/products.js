const   express  = require("express"),
        router   = express.Router(),
        Product  = require("../models/product");

// RESTful CRUD functionality

// Create a product
router.post('/', (req, res) => {
    const product = req.body;
    const date = product.expirationDate.split('-');
    const expirationDate = new Date(date[0], date[1] - 1, date[2]); 
    const newProduct = {
        name: product.name,
        brand: product.brand,
        expirationDate: expirationDate,
        price: product.price,
        supplier: product.supplier,
    }; 
    // Create a new product and save it to DB
    Product.create(newProduct, (err, newlyCreated) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(newlyCreated);
        }
    });
});

// Read all products
router.get('/', (req, res) => {
    Product.find({}, (err, products) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(products);
        }
    });
});

// Read a product
router.get('/:product_id', (req, res) => {
    Product.findById(req.params.product_id, (err, foundProduct) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(foundProduct);
        }
    });
});

// Update a product
router.put('/:product_id', (req, res) => {
    const product = req.body;
    const date = product.expirationDate.split('-');
    const expirationDate = new Date(date[0], date[1] - 1, date[2]); 
    const updateProduct = {
        name: product.name,
        brand: product.brand,
        expirationDate: expirationDate,
        price: product.price,
        supplier: product.supplier,
    }; 
    // Find the product and update it 
    Product.findByIdAndUpdate(req.params.product_id, updateProduct, {new: true}, (err, updatedProduct) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(updatedProduct);
        }
    });
});

// Delete a product
router.delete('/:product_id', (req, res) => {
    Product.findByIdAndRemove(req.params.product_id, (err) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(`Product with id: ${req.params.product_id} deleted`);
        }
     });
});

module.exports = router;