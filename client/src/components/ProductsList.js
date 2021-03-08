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

const ProductsList = ({ products }) => {
    const classes = useStyles();
    return(
        <>
            <h2>List of Products</h2>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Name </TableCell>
                    <TableCell align="left">Brand</TableCell>
                    <TableCell align="left">Expiration date</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Supplier</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                        <TableCell component="th" scope="row">
                            {product.name}
                        </TableCell>
                        <TableCell align="left">{product.brand}</TableCell>
                        <TableCell align="left">{product.expirationDate}</TableCell>
                        <TableCell align="left">{product.price}</TableCell>
                        <TableCell align="left">{product.supplier}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    );
}

export default ProductsList;
