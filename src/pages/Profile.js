import React, { Component } from "react";
import VRScene from "./../components/VRScene";
import EditProfile from "./../components/Profile";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";

class Profile extends Component {
  state = {
    username: "",
    space_name: "",
    theme: ""
  };

  componentDidMount() {
    const id = this.props.user._id;
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then(response => {
        console.log("Hello", response.data.username);
        const user = response.data;
        this.setState({
          username: user.username,
          space_name: user.space_name,
          theme: user.theme
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div style={{backgroundColor:'rgba(255, 255, 255, 0.04)'}}>
        <div className="vrscene-h1">
          <h1 style={{marginTop:"0.5em"}}>
            Welcome back to {this.state.space_name}, {this.state.username}
          </h1>
        </div>
        <VRScene />
        <EditProfile />
        </div>
        <footer>Rose Beatty 2019</footer>
      </div>
    );
  }
}

export default withAuth(Profile);
