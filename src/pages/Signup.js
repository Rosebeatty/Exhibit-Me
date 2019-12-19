import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";

class Signup extends Component {
  state = { 
    username: "",
    password: "", 
    space_name: "", 
    theme: "", 
    email: "",
    background_image:"",
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, space_name, theme, email, background_image } = this.state;
    //  console.log('Signup -> form submit', { username, password });
    this.props.signup({ username, password, space_name, theme, email, background_image }); // props.signup is Provided by withAuth() and Context API
  
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  
                  

  render() {
    const { username, password, space_name, theme, email, background_image } = this.state;
    return (
      <div>
       <Navbar />
       <div style={{backgroundColor:'rgba(255, 255, 255, 0.04)', padding: "7vh 0"}}>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleFormSubmit} id="sign-up">
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
 <label>Your Space's Theme:</label>
          <input
            type="text"
            name="theme"
            value={theme}
            onChange={this.handleChange}
          />
          
        <label>Background Image:</label>
        <select value={background_image} name="background_image" id="background_image"  onChange="showValue(this.value)" onChange={this.handleChange} style={{width:"14%", height:"95%", margin:"1vh auto"}}>
          <option id="selected" value="bali" >Bali</option>
          <option id="selected" value="nature">Nature</option>
          <option id="selected" value="random">Random</option>
        </select>

        <label>Name Your 3D Space:</label>
          <input
            type="text"
            name="space_name"
            value={space_name}
            onChange={this.handleChange}
          />
         
          <br/>
       
  
            <input style={{width:"8%", margin:"1.5vh auto", backgroundColor:"#2ab193e5"}} type="submit" value="Signup" />
        </form>

        <p>Already have account?</p>
        <Link  to={"/login"}> Login</Link>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
