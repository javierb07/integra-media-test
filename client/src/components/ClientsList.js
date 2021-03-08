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

const ClientsList = ({ clients, deleteHandler }) => {
    const classes = useStyles();
    
    const splitDate = (date) => {
        return date.split('T')[0];
    }

    return(
        <>
            <h2>List of Clients</h2>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">First Name </TableCell>
                    <TableCell align="left">Last Name</TableCell>
                    <TableCell align="left">DNI</TableCell>
                    <TableCell align="left">Date of Birth</TableCell>
                    <TableCell align="left">Age</TableCell>
                    <TableCell align="left">Credit Card Number</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {clients.map((client) => (
                        <TableRow key={client._id}>
                        <TableCell component="th" scope="row">
                            {client.firstName}
                        </TableCell>
                        <TableCell align="left">{client.lastName}</TableCell>
                        <TableCell align="left">{client.dni}</TableCell>
                        <TableCell align="left">{splitDate(client.dob)}</TableCell>
                        <TableCell align="left">{client.age}</TableCell>
                        <TableCell align="left">{client.creditCard}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    );
}

export default ClientsList;
