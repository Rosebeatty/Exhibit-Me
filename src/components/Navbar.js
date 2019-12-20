import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import SearchBar from "./SearchBar";
import axios from "axios";

class Navbar extends Component {
  constructor(props) {
    super(props)
  this.state = {
   
  };
  }
  


  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div>
        {isLoggedin ? (
          <nav className="nav-style">
            <ul>
              <span>
                <Link to="/">
                  <p id="logo">Exhibit Me</p>
                </Link>
              </span>
              <li id="home">
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <SearchBar filterUsers={this.props.filterUsers}  />

              <li id="logout-btn">
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="nav-style">
            <ul>
              <li>
                <Link to="/login">
                  {" "}
                  <button>Login</button>{" "}
                </Link>
              </li>
              <br />
              <li>
                <Link to="/signup">
                  {" "}
                  <button className="logout-btn">Signup</button>{" "}
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
