const   express = require("express"),
        router  = express.Router(),
        Client  = require("../models/client");

// RESTful CRUD functionality

// Create a client
router.post('/', (req, res) => {
    const client = req.body;
    const date = client.dob.split('-');
    const dobDate = new Date(date[0], date[1] - 1, date[2]); 
    const newClient = {
        firstName: client.firstName,
        lastName: client.lastName,
        dni: client.dni,
        dob: dobDate,
        age: client.age,
        creditCard: client.creditCard,
    }; 
    // Create a new client and save it to DB
    Client.create(newClient, (err, newlyCreated) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(newlyCreated);
        }
    });
});

// Read all clients
router.get('/', (req, res) => {
    Client.find({}, (err, clients) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(clients);
        }
    });
});

// Read a client
router.get('/:client_id', (req, res) => {
    Client.findById(req.params.client_id, (err, foundClient) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(foundClient);
        }
    });
});

// Update a client
router.put('/:client_id', (req, res) => {
    const client = req.body;
    const date = client.dob.split('-');
    const dobDate = new Date(date[0], date[1] - 1, date[2]); 
    const updateClient = {
        firstName: client.firstName,
        lastName: client.lastName,
        dni: client.dni,
        dob: dobDate,
        age: client.age,
        creditCard: client.creditCard,
    }; 
    // Find the client and update it 
    Client.findByIdAndUpdate(req.params.client_id, updateClient, {new: true}, (err, updatedClient) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(updatedClient);
        }
    });
});

// Delete a client
router.delete('/:client_id', (req, res) => {
    Client.findByIdAndRemove(req.params.client_id, (err) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(`Client with id: ${req.params.client_id} deleted`);
        }
     });
});

module.exports = router;
