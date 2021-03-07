import React from 'react';
import ProductsList from '../components/ProductsList';
import AddProduct from '../components/AddProduct';
import axios from 'axios';

export default class Products extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productsContent: []
        };
      }
  
    componentDidMount() {
      axios.get(`/api/products/`)
        .then(res => {
          const productsContent = res.data;
          this.setState({ productsContent });
        })
    }
  
    render() {
      return (
        <>
            <h1>Products</h1>
            <AddProduct  />
            <ProductsList products={this.state.productsContent} />
         </>
      )
    }
  }
