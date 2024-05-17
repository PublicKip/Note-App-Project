import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0Provider
            domain={"dev-ul2q41gkn2vtnp3m.us.auth0.com"}
            clientId={"f6DiDZqkLz7psuEymYIgxK8lUg6vfOap"}
            authorizationParams={{
              redirect_uri: window.location.origin,
            }}     >
        <Provider store={store}>
          <App />
        </Provider>
        </Auth0Provider>
      {/* </Auth0ProviderWithHistory> */}
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
