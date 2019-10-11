import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(9),
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const CREATE_GROUP = gql`
  mutation createGroup($name: String) {
    createGroup(name: $name) {
      name
    }
  }
`;

export default function Group() {
    const classes = useStyles();
    const [createGroup] = useMutation(CREATE_GROUP);
    const [name, setName] = useState('');

    function handleSubmit(e) {
      e.preventDefault();
      createGroup({ variables: { name: name } });
    }

    function handleChange(e) {
        setName(e.target.value)
    }

    return (
      <React.Fragment>
        <Paper className={classes.root} elevation={1}>
          <form
            onSubmit={handleSubmit}
          >
            <TextField
              id="name"
              label="Group Name"
              margin="normal"
              on
              className={classes.textField}
              value={name}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <Button variant="contained" color="primary" type="submit">Save</Button>
            </FormControl>
          </form>
        </Paper>
      </React.Fragment>
    );
}
