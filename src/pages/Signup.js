import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Signup extends Component {
  state = { username: "", password: "", space_name: "", theme: "", email: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, space_name, theme, email } = this.state;
    //  console.log('Signup -> form submit', { username, password });
    this.props.signup({ username, password, space_name, theme, email }); // props.signup is Provided by withAuth() and Context API
    console.log(space_name);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, space_name, theme, email } = this.state;
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />

          <label>Name Your 3D Space:</label>
          <input
            type="text"
            name="space_name"
            value={space_name}
            onChange={this.handleChange}
          />

          <label>Your Space's Theme:</label>
          <input
            type="text"
            name="theme"
            value={theme}
            onChange={this.handleChange}
          />

          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);
