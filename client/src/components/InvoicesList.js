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
    return(
        <>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Client </TableCell>
                    <TableCell align="center">Employee</TableCell>
                    <TableCell align="center">Products</TableCell>
                    <TableCell align="center">Date of Pruchase</TableCell>
                    <TableCell align="center">Total Price</TableCell>
                    <TableCell align="center">Print Invoice</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice._id}>
                            <TableCell align="left">
                                <li>Full name: {invoice.client.firstName} {invoice.client.lastName}</li>
                                <li>DNI: {invoice.client.dni}</li>
                                <li>DoB: {invoice.client.dob}</li>
                                <li>Age: {invoice.client.age}</li>
                                <li>Credit Card: {invoice.client.creditCard}</li>
                            </TableCell>
                            <TableCell align="left">
                                <li>Full name: {invoice.employee.firstName} {invoice.employee.lastName}</li>
                                <li>DNI: {invoice.employee.dni}</li>
                                <li>DoB: {invoice.employee.dob}</li>
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
                            <TableCell align="center">{invoice.dateOfPurchase}</TableCell>
                            <TableCell align="center">{invoice.totalPrice.toFixed(2)}</TableCell>
                            <TableCell align="center">
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
