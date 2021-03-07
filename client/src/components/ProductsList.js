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
                    <TableCell align="right">Brand</TableCell>
                    <TableCell align="right">Expiration date</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Supplier</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                        <TableCell component="th" scope="row">
                            {product.name}
                        </TableCell>
                        <TableCell align="right">{product.brand}</TableCell>
                        <TableCell align="right">{product.expirationDate}</TableCell>
                        <TableCell align="right">{product.price}</TableCell>
                        <TableCell align="right">{product.supplier}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    );
}

export default ProductsList;
