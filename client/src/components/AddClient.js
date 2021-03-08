import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";

export default function AddClient(props) {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    },
    leftIcon: {
      marginRight: theme.spacing(1)
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    iconSmall: {
      fontSize: 20
    },
    root: {
      padding: theme.spacing(3, 2)
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(2),
      width: 400
    }
  }));

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: '',
      lastName: '',
      dni: 0,
      dob: '',
      age: 0,
      creditCard: 0,
    }
  );

  const handleSubmit = evt => {
    evt.preventDefault();

    let data = { formInput };
    fetch("/api/clients/", {
      method: "POST",
      body: JSON.stringify(data.formInput),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .then(props.addHandler())
      .catch(error => console.error("Error:", error));
  };

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Add Client to Database
        </Typography>
        <Typography component="p">Use this form to add a new client to the database</Typography>

        <form onSubmit={handleSubmit}>
            <TextField
                label="First Name"
                id="margin-normal"
                name="firstName"
                defaultValue={formInput.firstName}
                className={classes.textField}
                helperText="Enter first name"
                onChange={handleInput}
            />
            <TextField
                label="Last Name"
                id="margin-normal"
                name="lastName"
                defaultValue={formInput.lastName}
                className={classes.textField}
                helperText="Enter last name"
                onChange={handleInput}
            />
            <TextField
                id="date"
                label="Date of Birth"
                name='dob'
                type="date"
                defaultValue={formInput.dob}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleInput}
            />
            <TextField
                label="DNI"
                id="standard-number"
                name="dni"
                defaultValue={formInput.dni}
                type="number"
                className={classes.textField}
                onChange={handleInput}
            />
            <TextField
                label="Age"
                id="standard-number"
                name="age"
                defaultValue={formInput.age}
                type="number"
                className={classes.textField}
                onChange={handleInput}
            />
            <TextField
                label="Credit Card Number"
                id="standard-number"
                name="creditCard"
                defaultValue={formInput.creditCard}
                type="number"
                className={classes.textField}
                onChange={handleInput}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
            >
                Add client <Icon className={classes.rightIcon}>send</Icon>
            </Button>
        </form>
      </Paper>
    </div>
  );
}
