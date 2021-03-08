import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});

const InvoicesList = ({ invoices }) => {
    const classes = useStyles();
    
    const splitDate = (date) => {
        return date.split('T')[0];
    }

    return(
        <>
            {console.log(invoices)}
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Client </TableCell>
                        <TableCell align="left">Employee</TableCell>
                        <TableCell align="left">Products</TableCell>
                        <TableCell align="left">Date of Pruchase</TableCell>
                        <TableCell align="left">Total Price</TableCell>
                        <TableCell align="left">Print Invoice</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice._id}>
                            <TableCell align="left">
                                <li>Full name: {invoice.client.firstName} {invoice.client.lastName}</li>
                                <li>DNI: {invoice.client.dni}</li>
                                <li>DoB: {splitDate(invoice.client.dob)}</li>
                                <li>Age: {invoice.client.age}</li>
                                <li>Credit Card: {invoice.client.creditCard}</li>
                            </TableCell>
                            <TableCell align="left">
                                <li>Full name: {invoice.employee.firstName} {invoice.employee.lastName}</li>
                                <li>DNI: {invoice.employee.dni}</li>
                                <li>DoB: {splitDate(invoice.employee.dob)}</li>
                                <li>Age: {invoice.employee.age}</li>
                                <li>Employee ID: {invoice.employee.employeeID}</li>
                            </TableCell>
                            <TableCell align="left">
                                {invoice.products.map((product) => (
                                    
                                    <li key={product.product._id}>
                                        {product.product.name} ({product.quantity})
                                    </li>
                                ))}
                            </TableCell>
                            <TableCell align="left">{splitDate(invoice.dateOfPurchase)}</TableCell>
                            <TableCell align="left">{invoice.totalPrice.toFixed(2)}</TableCell>
                            <TableCell align="left">
                               <a href={`/api/invoices/${invoice._id}/pdf`}>Print Invoice</a> 
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    );
}

export default InvoicesList;
