import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router"
import { Auth } from 'aws-amplify';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MainAppBar() {
  let history = useHistory()
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const goTo = (route) => {
    history.push(`/${route}`)
  }

  const handleLogout = () => {
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  };

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const leftList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer('left', false)}
      onKeyDown={toggleDrawer('left', false)}
    >
    </div>
  );

  const rightList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer('right', false)}
      onKeyDown={toggleDrawer('right', false)}
    >
      <List>
        <ListItem button onClick={() => goTo('profile')}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
            {rightList()}
          </Drawer>
          <Typography variant="h6" className={classes.title}>
           <Button onClick={() => goTo('')}>Home</Button>
          </Typography>
          <IconButton onClick={toggleDrawer('right', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}