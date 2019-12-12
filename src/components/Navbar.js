import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';


class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div>
        {isLoggedin ? ( 
        <nav className="nav-style" >
      <ul>
      <span>
      <Link to="/">
                  <p id="logo">Exhibit Me</p>
              </Link>
              </span>
          <li id="home">
              <Link to="/">
                  Home
              </Link>
          </li>
          <li>
              <Link to="/profile">
                  Profile
              </Link>
          </li>
          <li id="search-bar">
                  <input type="text" id="search-input" />
                  <button id="search-button">Search</button>
          </li>
          <li id="logout-btn">
            <button  onClick={logout}>Logout</button>
          </li>
      </ul>
  </nav>

        ) : (
         
          <nav className="nav-style" >
      <ul>
          <li>
            <Link to="/login">
              {' '}
              <button>Login</button>{' '}
            </Link>
            </li>
            <br />
            <li>
            <Link to="/signup">
              {' '}
              <button className="logout-btn">Signup</button>{' '}
            </Link>
            </li>
            </ul>
          </nav>
        )}



      </div>
    );
  }
}

export default withAuth(Navbar);
