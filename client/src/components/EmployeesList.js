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
    return(
        <>
            <h2>List of Employees</h2>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="right">First Name </TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">DNI</TableCell>
                    <TableCell align="right">Date of Birth</TableCell>
                    <TableCell align="right">Age</TableCell>
                    <TableCell align="right">Employee ID</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee._id}>
                        <TableCell component="th" scope="row">
                            {employee.firstName}
                        </TableCell>
                        <TableCell align="right">{employee.lastName}</TableCell>
                        <TableCell align="right">{employee.dni}</TableCell>
                        <TableCell align="right">{employee.dob}</TableCell>
                        <TableCell align="right">{employee.age}</TableCell>
                        <TableCell align="right">{employee.employeeID}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    );
}

export default EmployeesList;
