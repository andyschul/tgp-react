import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-client-preset'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
  })
  
  const middlewareAuthLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('CognitoIdentityServiceProvider.4kllfac0ensrledet05qbs2dme.1677e7c2-28d4-4fbe-99b4-12f5b70946ca.idToken')
    const authorizationHeader = token
    operation.setContext({
      headers: {
        authorization: authorizationHeader
      }
    })
    return forward(operation)
  })
  
  const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)
  
  const client = new ApolloClient({
    link: httpLinkWithAuthToken,
    cache: new InMemoryCache()
  });

ReactDOM.render(
<ApolloProvider client={client}>
  <App />
</ApolloProvider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
