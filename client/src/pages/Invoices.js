import React from 'react';
import InvoicesList from '../components/InvoicesList';
import axios from 'axios';

export default class Invoices extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            invoicesContent: []
        };
      }
  
    componentDidMount() {
      axios.get(`/api/invoices/`)
        .then(res => {
          const invoicesContent = res.data;
          console.log(invoicesContent);
          this.setState({ invoicesContent });
        })
    }
  
    render() {
      return (
        <>
            <h1>Invoices</h1>
            <InvoicesList invoices={this.state.invoicesContent} />
         </>
      )
    }
}
