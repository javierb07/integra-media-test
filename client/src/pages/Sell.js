import React from 'react';
import axios from 'axios';
import { Button, TextField } from "@material-ui/core";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

export default class Sell extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            clientsContent: [],
            employeesContent: [],
            productsContent: [],
            invoiceData: [],
            clientID: '',
            employeeID: '',
            products: [],
        };
        this.handleChangeClient = this.handleChangeClient.bind(this);
        this.handleChangeEmployee = this.handleChangeEmployee.bind(this);
        this.handleChangeProduct = this.handleChangeProduct.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
  
    componentDidMount() {
      axios.get(`/api/products/`)
        .then(res => {
          const productsContent = res.data;
          this.setState({ productsContent });
        })
        axios.get(`/api/clients/`)
        .then(res => {
          const clientsContent = res.data;
          this.setState({ clientsContent });
          this.setState({ clientID: this.state.clientsContent[0]._id });
        })
        axios.get(`/api/employees/`)
        .then(res => {
          const employeesContent = res.data;
          this.setState({ employeesContent });
          this.setState({ employeeID: this.state.employeesContent[0]._id });

        })
    
    }

    handleChangeClient(event) {
      const clientID = event.target.value;
      this.setState({clientID});
    }
    
    handleChangeEmployee(event) {
      const employeeID = event.target.value;
      this.setState({employeeID});
    }

    handleSubmit(event){
      event.preventDefault();
      const date = new Date();
      const month = date.getUTCMonth() + 1; //months from 1-12
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();
      const dateFormatted = year +  "-" + month + "-" + day ;
      const data = { 
        client: this.state.clientID,
        employee: this.state.employeeID,
        products: this.state.products,
        dateOfPurchase: dateFormatted,
      };
      fetch("api/invoices/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(response => console.log("Success:", JSON.stringify(response)))
        .then(alert("Sale made!"))
        .catch(error => console.error("Error:", error));
    }

    unDuplicateArrayObjects(array, propertyName) {
      function unDuplicateArraySingleValues(array) {
        // Check if we are dealing with an Array that is not empty
        if (!array || !Array.isArray(array) || array.length === 0) {
          return array;
        }
      
        // Return a Array of unique values thanks to the Set
        return [...new Set(array)];
      }
      if (!array || !Array.isArray(array) || array.length === 0 || !propertyName) {
        return array;
      }
      // Create an Array off the values of the keys we want to check
      let objectArrayKeys = array.map(item => item[propertyName]);
    
      // Remove duplicate values from those values with our previous function
      let uniqueKeys = unDuplicateArraySingleValues(objectArrayKeys);
    
      // Return an Array with only unique Objects
      return uniqueKeys.map(key => array.find(item => item[propertyName] === key));
    }

    findWithAttr(array, attr, value) {
      for(var i = 0; i < array.length; i += 1) {
          if(array[i][attr] === value) {
              return i;
          }
      }
      return -1;
    
    }
    handleChangeProduct(id, event) {
      let products = this.state.products;
        console.log(event.target.value);
        products.push({_id: id, quantity: event.target.value})
        products = this.unDuplicateArrayObjects(products, '_id');
        const index = this.findWithAttr(products, '_id', id);
        products[index].quantity =  event.target.value;
        if(event.target.value === 0){
          products.splice(index, 1);
        }
        console.log(products);
        this.setState({products: products})

    }

    render() {
      return (
        <>
          <h1>Register a sale</h1>
          <Container>
            <Jumbotron>
              <form onSubmit={this.handleSubmit}>
                <div className={'select-css row mb-2'}>
                  <label className={'col-6'}>
                      <span className={'mr-2'}>
                        Select a client:
                        </span>
                        <select className={'select-css'} value={this.state.clientID} onChange={this.handleChangeClient}>
                            {this.state.clientsContent.map(client =>(
                                <option key={client._id} value={client._id}>{client.firstName} {client.lastname} - DNI: {client.dni}</option>
                            ))}
                        </select>
                  </label>
                  <label className={'col-6'}>
                    <span className={'mr-2'}>
                      Select an employee:     
                    </span>
                    <select value={this.state.employeeID} onChange={this.handleChangeEmployee}>
                        {this.state.employeesContent.map(employee =>(
                            <option key={employee._id} value={employee._id}>{employee.firstName} {employee.lastname} - DNI: {employee.dni}</option>
                        ))}
                    </select>
                  </label>
                </div>
                <div className={'row text-center mb-2 invoice-header'}>
                        <div className={'col-3'}>Name</div>
                        <div className={'col-3'}>Brand</div>
                        <div className={'col-3'}>Price</div>
                        <div className={'col-3'}>Quantity</div>
                </div>
                {this.state.productsContent.map((product) => (
                  <>
                      <li key={product._id} className={'row li-invoice'}>
                        <div className={'col-3'}>{product.name}</div>
                        <div className={'col-3'}>{product.brand}</div>
                        <div className={'col-3'}>{product.price}</div>
                        <div className={'col-3'}>
                        <TextField
                            id="standard-number"
                            name="quantity"
                            InputProps={{ inputProps: { min: 0 } }}
                            defaultValue={0}
                            type="number"
                            onChange={evt => this.handleChangeProduct(product._id, evt)}
                          />
                        </div>
                      </li>
                  </>
                ))}
                <div className={'invoice-button'}>
                  <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                  >
                      Make sale
                  </Button>
                </div>
              </form>
            </Jumbotron>
          </Container>
         </>
      )
    }
}
