import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './lib/AuthProvider';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById('root'),
);

serviceWorker.register()