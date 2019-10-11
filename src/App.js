import React from 'react';
import Home from './components/Home'
import Profile from './components/Profile'
import Group from './components/Group'
import MainAppBar from './components/MainAppBar'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      <MainAppBar />
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/groups" component={Group} />
    </Router>
  );
}

const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'Email',
      key: 'username',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password'
    }
  ]
};
const usernameAttributes = 'email';

export default withAuthenticator(App, {
  signUpConfig,
  usernameAttributes
});
