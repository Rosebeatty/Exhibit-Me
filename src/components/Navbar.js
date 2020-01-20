import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import SearchBar from "./SearchBar";

class Navbar extends Component {
  submitSearch = e => {
    e.preventDefault();
    this.props.history.push(`/`);
  };


  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div>
        {isLoggedin ? (
          <nav className="navbar navbar-expand-lg navbar-dark" id="navbar">
          <span className="navbar-brand">
          <Link to="/">
                  <p id="logo">Exhibit Me</p>
                </Link>
              </span>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" style={{"color":"white"}}></span>
               </button>
          <div className="collapse navbar-collapse flex-grow-1" id="navbarSupportedContent">
            <ul className="nav navbar-nav">
              <li id="home" className="nav-item" >
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item" >
                <Link to="/profile">Profile</Link>
              </li>
             
              <SearchBar
                submitSearch={this.submitSearch}
                filterUsers={this.props.filterUsers}
              /> 
             
              
              <li className="nav-item">
                <button  id="logout-btn" onClick={logout}>Logout</button>
              </li>
            </ul>
            </div>
              
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
