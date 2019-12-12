import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import UserPage from './pages/UserPage';
import Navbar from './components/Navbar';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/:id" component={UserPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
