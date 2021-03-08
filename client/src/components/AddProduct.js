import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";

export default function AddProduct(props) {
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
      name: "",
      brand: "",
      expirationDate: '',
      price: 0,
      supplier: '',
    }
  );

  const handleSubmit = evt => {
    evt.preventDefault();

    let data = { formInput };
    fetch("/api/products/", {
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
          Add Product to Database
        </Typography>
        <Typography component="p">Use this form to add a new product to the database</Typography>

        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                id="margin-normal"
                name="name"
                defaultValue={formInput.name}
                className={classes.textField}
                helperText="Enter product name"
                onChange={handleInput}
            />
            <TextField
                label="Brand"
                id="margin-normal"
                name="brand"
                defaultValue={formInput.brand}
                className={classes.textField}
                helperText="Enter brand name"
                onChange={handleInput}
            />
            <TextField
                id="date"
                label="Expiration date"
                name='expirationDate'
                type="date"
                defaultValue={formInput.expirationDate}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleInput}
            />
            <TextField
                label="Supplier"
                id="margin-normal"
                name="supplier"
                defaultValue={formInput.supplier}
                className={classes.textField}
                helperText="Enter supplier name"
                onChange={handleInput}
            />
            <TextField
                label="Price"
                id="standard-number"
                InputProps={{ inputProps: { min: 0 } }}
                name="price"
                defaultValue={formInput.price}
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
                Add product <Icon className={classes.rightIcon}>send</Icon>
            </Button>
        </form>
      </Paper>
    </div>
  );
}
