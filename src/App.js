import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
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

  submitSearch = (e, searchStr) => {
    e.preventDefault();
    this.props.history.push(`/?search=${searchStr}`);
  };

  render() {
    return (
      <div className="App">
       <Navbar submit={this.submitSearch} />
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

export default withRouter(App);
