const   express     = require("express"),
        router      = express.Router(),
        PDFDocument = require('pdfkit'),
        fs          = require('fs'),
        Employee    = require("../models/employee"),
        Client      = require("../models/client"),
        Product     = require("../models/product"),
        Invoice     = require("../models/invoice");

// RESTful CRUD functionality

// Create an invoice
router.post('/', async (req, res) => {
    const invoice = req.body;
    const date = invoice.dateOfPurchase.split('-');
    const dateOfPurchase = new Date(date[0], date[1] - 1, date[2]); 
    let client = {}; 
    await Client.findById(invoice.client, (err, foundClient) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            client = foundClient;
        }
    });
    let employee = {}; 
    await Employee.findById(invoice.employee, (err, foundEmployee) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            employee = foundEmployee;
        }
    });
    let products_ids = invoice.products.map(product => product._id);
    const product_qties = invoice.products.map(product => product.quantity);
    let products = await Product.find().where('_id').in(products_ids).exec();
    products_ids = products.map(product => product._id);
    let totalPrice = 0;
    let productsObj = {};
    let productsArr = [];
    for (let i=0; i < products.length; i++) {
        totalPrice += product_qties[i] * products[i].price;
        productsObj.product = products[i]._id;
        productsObj.quantity = product_qties[i];
        productsArr.push(productsObj);
    }
    console.log(productsArr);
    const newInvoice = new Invoice({
        client: client._id,
        employee: employee._id,
        products: productsArr,
        dateOfPurchase: dateOfPurchase,
        totalPrice: totalPrice,
    }); 
    newInvoice.save((err) => {
        if (!err) {
            Invoice.find({})
                .populate('client')
                .populate('employee')
                .populate('products')
                .populate('products.product')
                .exec((err, invoices) => {
                    if(err){
                        console.log(err);
                        res.render("error", {error: err});
                    } else {
                        res.json(invoices);
                    }                   
                });
        } else {
            console.log(err);
            res.render("error", {error: err});
        }
    });
});

// Read all invoices
router.get('/', (req, res) => {
    Invoice.find({})
    .populate()
    .populate('client')
    .populate('employee')
    .populate('products')
    .populate('products.product')
    .exec((err, invoices) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(invoices);
        }
    });
});

// Read an invoice
router.get('/:invoice_id', (req, res) => {
    Invoice.findById(req.params.invoice_id)
    .populate()
    .populate('client')
    .populate('employee')
    .populate('products')
    .populate('products.product')
    .exec((err, invoice) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(invoice);
        }
    });
});

// Update an invoice
router.put('/:invoice_id', async (req, res) => {
    const invoice = req.body;
    const date = invoice.dateOfPurchase.split('-');
    const dateOfPurchase = new Date(date[0], date[1] - 1, date[2]); 
    let client = {}; 
    await Client.findById(invoice.client, (err, foundClient) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            client = foundClient;
        }
    });
    let employee = {}; 
    await Employee.findById(invoice.employee, (err, foundEmployee) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            employee = foundEmployee;
        }
    });
    let products_ids = invoice.products.map(product => product._id);
    const product_qties = invoice.products.map(product => product.quantity);
    let products = await Product.find().where('_id').in(products_ids).exec();
    products_ids = products.map(product => product._id);
    let totalPrice = 0;
    let productsObj = {};
    let productsArr = [];
    for (let i=0; i < products.length; i++) {
        totalPrice += product_qties[i] * products[i].price;
        productsObj.product = products[i]._id;
        productsObj.quantity = product_qties[i];
        productsArr.push(productsObj);
    }
    const updateInvoice = {
        client: client._id,
        employee: employee._id,
        products: productsArr,
        dateOfPurchase: dateOfPurchase,
        totalPrice: totalPrice,
    }; 
    Invoice.findByIdAndUpdate(req.params.invoice_id, updateInvoice, {new: true}, (err, updatedInvoice) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(updatedInvoice);
        }
    });
});

// Delete an invoice
router.delete('/:invoice_id', (req, res) => {
    Invoice.findByIdAndRemove(req.params.invoice_id, (err) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(`Invoice with id: ${req.params.invoice_id} deleted`);
        }
     });
});

// Create pdf invoice
router.get('/:invoice_id/pdf', (req, res) => {
    // First obtain all information from the invoice
    Invoice.findById(req.params.invoice_id)
    .populate()
    .populate('client')
    .populate('employee')
    .populate('products')
    .populate('products.product')
    .exec((err, invoice) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            // Create a document
            const doc = new PDFDocument();
            doc.pipe(res);
            // Embed a font, set the font size, and render some text
            doc
            .fontSize(40)
            .text('Company Name', 100, 100)
            .fontSize(20)
            .text(' ');
            doc
            .text('Client:');
            const client = `Name: ${invoice.client.firstName} ${invoice.client.lastName} \n
            `;
            doc
            .fontSize(10)
            .text(`${client}`, {
                width: 410,
                align: 'left'
              }
            );
            doc
            .fontSize(20)
            .text('Employee:');
            const employee = `Name: ${invoice.employee.firstName} ${invoice.employee.lastName}
Employee ID: ${invoice.employee.employeeID} \n
            `;
            doc
            .fontSize(10)
            .text(`${employee}`, {
                width: 410,
                align: 'left'
              }
            );
            doc
            .fontSize(20)
            .text('Products selled:')
            .fontSize(10)
            for (let product of invoice.products){
                doc.text(`Name: ${product.product.name}     Price: ${product.product.price}     Quantity: ${product.quantity}   Total: ${product.product.price * product.quantity} `);
            }
            const month = invoice.dateOfPurchase.getUTCMonth() + 1; //months from 1-12
            const day = invoice.dateOfPurchase.getUTCDate();
            const year = invoice.dateOfPurchase.getUTCFullYear();
            const newdate = day + "/" + month + "/" + year
            doc
            .fontSize(20)
            .text(` `)
            .text(`Date of puchase: ${newdate}`)
            .text(` `)
            .text(`Total of invoice: ${invoice.totalPrice.toFixed(2)}`)
            doc.end()
        }
    });
});

module.exports = router;
