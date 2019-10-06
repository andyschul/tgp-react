import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Auth } from 'aws-amplify';

export default function Home() {
    function signOut() {
      Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
    }
  
    function checkUser() {
      Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(user => console.log(user))
      .catch(err => console.log(err));
    }
  
    return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload!
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
              <button onClick={signOut}>Sign out</button>
              <button onClick={checkUser}>Check user</button>
            </header>
          </div>
    );
  }