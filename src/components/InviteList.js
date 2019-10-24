import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';

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

const UPDATE_USER = gql`
  mutation inviteToGroup($groupId: ID!, $email: String) {
    inviteToGroup(groupId: $groupId, email: $email) {
      email
    }
  }
`;

export default function InviteList(props) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [inviteToGroup] = useMutation(UPDATE_USER);

    function handleSubmit(e) {
        e.preventDefault();
        inviteToGroup({ variables: { groupId: props.groupId, email: email } });
      }

      function handleChange(e) {
        setEmail(e.target.value);
      }

    return (
        <React.Fragment>
        <Paper className={classes.root} elevation={1}>
          <form
            onSubmit={handleSubmit}
          >
            <TextField
              id="email"
              label="Email"
              margin="normal"
              className={classes.textField}
              value={email}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <Button variant="contained" color="primary" type="submit">Save</Button>
            </FormControl>
          </form>
        </Paper>
      </React.Fragment>
    )
}