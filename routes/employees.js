const   express  = require("express"),
        router   = express.Router(),
        Employee = require("../models/employee");

// RESTful CRUD functionality

// Create an employee
router.post('/', (req, res) => {
    const employee = req.body;
    const date = employee.dob.split('-');
    const age = getAge(employee.dob);
    const dobDate = new Date(date[0], date[1] - 1, date[2]); 
    const newEmployee = {
        firstName: employee.firstName,
        lastName: employee.lastName,
        dni: employee.dni,
        dob: dobDate,
        age: age,
        employeeID: employee.employeeID,
    }; 
    // Create a new employee and save it to DB
    Employee.create(newEmployee, (err, newlyCreated) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(newlyCreated);
        }
    });
});

// Read all employees
router.get('/', (req, res) => {
    Employee.find({}, (err, employees) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(employees);
        }
    });
});

// Read an employee
router.get('/:employee_id', (req, res) => {
    Employee.findById(req.params.employee_id, (err, foundEmployee) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(foundEmployee);
        }
    });
});

// Update an employee
router.put('/:employee_id', (req, res) => {
    const employee = req.body;
    const date = employee.dob.split('-');
    const dobDate = new Date(date[0], date[1] - 1, date[2]); 
    const updateEmployee = {
        firstName: employee.firstName,
        lastName: employee.lastName,
        dni: employee.dni,
        dob: dobDate,
        age: employee.age,
        employeeID: employee.employeeID,
    }; 
    // Find the employee and update it 
    Employee.findByIdAndUpdate(req.params.employee_id, updateEmployee, {new: true}, (err, updatedEmployee) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(updatedEmployee);
        }
    });
});

// Delete an employee
router.delete('/:employee_id', (req, res) => {
    Employee.findByIdAndRemove(req.params.employee_id, (err) => {
        if(err){
            console.log(err);
            res.render("error", {error: err});
        } else {
            res.json(`Employee with id: ${req.params.employee_id} deleted`);
        }
     });
});

// Helper calculate age function
function getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

module.exports = router;
