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

const EmployeesList = ({ employees }) => {
    const classes = useStyles();

    const splitDate = (date) => {
        return date.split('T')[0];
    }

    return(
        <>
            <h2>List of Employees</h2>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">First Name </TableCell>
                    <TableCell align="left">Last Name</TableCell>
                    <TableCell align="left">DNI</TableCell>
                    <TableCell align="left">Date of Birth</TableCell>
                    <TableCell align="left">Age</TableCell>
                    <TableCell align="left">Employee ID</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee._id}>
                        <TableCell component="th" scope="row">
                            {employee.firstName}
                        </TableCell>
                        <TableCell align="left">{employee.lastName}</TableCell>
                        <TableCell align="left">{employee.dni}</TableCell>
                        <TableCell align="left">{splitDate(employee.dob)}</TableCell>
                        <TableCell align="left">{employee.age}</TableCell>
                        <TableCell align="left">{employee.employeeID}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    );
}

export default EmployeesList;
