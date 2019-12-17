import React, { Component } from "react";
import VRScene from "./../components/VRScene";
import Comments from "./../components/Comments";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
// import Users from "../lib/user-service";
import Navbar from "../components/Navbar";

class UserPage extends Component {
  state = {
    user: []
  };

  getUser = (id) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then(response => {
        console.log(response);
        const user = response.data;
        this.setState({ user: user });
      })
      .catch(err => console.log(err));
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    console.log(this.props);
    this.getUser(id);

  }


  render() {
    return (
      <div>
        <Navbar />
        <div style={{backgroundColor:'rgba(255, 255, 255, 0.04)'}}>
        <h2 style={{padding:"1em 0 0.5em 0"}}>Welcome to {this.state.user.username}'s Environment </h2>
        <VRScene getUser={this.getUser} />

        <Comments getUser={this.getUser}/>
      </div>
        <footer ><p>Rose Beatty 2019</p></footer>
      </div>
    );
  }
}

export default withAuth(UserPage);
