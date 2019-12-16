import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import SearchBar from "./SearchBar";
import axios from "axios";

class Navbar extends Component {
  state = {
    // users: [],
    // selected: []
  };

  // filterUsers = (input) => {
  //   console.log(this.state.users)
  //   console.log(this.state.selected)
  //   let selected = this.state.users.filter((el) => {
  //      return el.username.includes(input)

  //   }
  //    );
  //    console.log(selected)
  //    this.setState({ selected: selected })

  //   }

  // getAllUsers = () => {
  //   axios.get('http://localhost:5000/users')
  //     .then((response) => {
  //       console.log(response.data[0].username)
  //       const users = response.data;
  //       this.setState({users: users, selected:users})
  //       console.log(this.state.users)
  //     })
  //     .catch((err) => console.log(err))
  // }

  // componentDidMount() {
  //     this.getAllUsers()
  // }

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
              <SearchBar filterUsers={this.props.filterUsers} />

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
