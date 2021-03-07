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

const ClientsList = ({ clients }) => {
    const classes = useStyles();
    return(
        <>
            <h2>List of Clients</h2>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="right">First Name </TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">DNI</TableCell>
                    <TableCell align="right">Date of Birth</TableCell>
                    <TableCell align="right">Age</TableCell>
                    <TableCell align="right">Credit Card Number</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {clients.map((client) => (
                        <TableRow key={client._id}>
                        <TableCell component="th" scope="row">
                            {client.firstName}
                        </TableCell>
                        <TableCell align="right">{client.lastName}</TableCell>
                        <TableCell align="right">{client.dni}</TableCell>
                        <TableCell align="right">{client.dob}</TableCell>
                        <TableCell align="right">{client.age}</TableCell>
                        <TableCell align="right">{client.creditCard}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    );
}

export default ClientsList;
