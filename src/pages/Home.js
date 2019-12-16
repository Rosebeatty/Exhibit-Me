import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";

class Home extends Component {
  state = {
    users: [],
    selected: []
  };

  filterUsers = input => {
    console.log(this.state.users);
    console.log(this.state.selected);
    let selected = this.state.users.filter(el => {
      return el.username.includes(input);
    });
    console.log(selected);
    this.setState({ selected: selected });
  };

  getAllUsers = () => {
    axios
      .get("http://localhost:5000/users")
      .then(response => {
        console.log(response.data[0].username);
        const users = response.data;
        this.setState({ users: users, selected: users });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getAllUsers();
  }

  render() {
    return (
      <div>
        <Navbar filterUsers={this.filterUsers} />
        <div style={{backgroundColor:'rgba(255, 255, 255, 0.04)'}}>
        <h1>Welcome to Exhibit Me</h1>
        <div id="user-name">
          {this.state.selected.map(user => {
            return (
              <div key={user._id} className="one-user">
                <Link to={`/${user._id}`}>
                <h3>{user.theme}</h3>
                  <h3>{user.username}</h3>
                </Link>
              </div>
             
            );
          })}
          </div>
        </div>
        <footer>Rose Beatty 2019</footer>
      </div>
    );
  }
}

export default withAuth(Home);
