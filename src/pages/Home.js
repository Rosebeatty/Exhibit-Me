import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import Profile from "../components/UserVRScene";

class Home extends Component {
  state = {
    users: [],
    selected: [],
    themes: [],
    background: "",
    selectedThemes: [],
    input: ""
  };

  getAllUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then(response => {
        console.log(response.data);
        const users = response.data;
        let themes = users.map(user => user.theme);
        // let bkg = themes.map(theme => theme )
        // let backgroundImg = `/${users.theme}.jpg`
        // console.log(bkg)
        this.setState({ users: users, selected: users, themes: themes });
        // this.themeAndUserEqual()
      })
      .catch(err => console.log(err));
  };

  componentDidMount = () => {
    this.getAllUsers();
    console.log(this.state.theme);
  };

  filterUsers = input => {
    console.log(this.state.users);
    console.log(this.state.selected);

    let selected = this.state.users.filter(el => {
      return (
        el.username.toLowerCase().includes(input.toLowerCase()) ||
        el.theme.toLowerCase().includes(input.toLowerCase()) ||
        el.space_name.toLowerCase().includes(input.toLowerCase())
      );
    });

    console.log(selected);
    this.setState({ selected: selected });
  };

  render() {
    return (
      <div>
        <Navbar filterUsers={this.filterUsers} />

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            padding: "1.2em 2em",
            minHeight: "90vh"
          }}
        >
          <h1
            style={{
              textAlign: "left",
              fontSize: "40px",
              margin: "0.9em auto 0.5em auto",
              width: "77%",
              paddingLeft: "1em",
              paddingBottom: "0.3em"
            }}
          >
            Discover
          </h1>

          <div>
            <div style={{ display: "none" }}>
              <Profile />
            </div>

            {this.state.selected.map(user => {
              return (
                <div key={user._id} className="one-user">
                  <Link to={`/${user._id}`}>
                    <div
                      style={{
                        width: "85%",
                        fontSize: "22px",
                        margin: "0.5em auto",
                        borderBottom: "1px solid grey",
                        textAlign: "center",
                        paddingBottom: "3.5em"
                      }}
                    >
                      <h3>{user.space_name} </h3>
                      <div
                        style={
                          {
                            // display:"flex", flexDirection:"row", width: "30%"
                          }
                        }
                      >
                        <h3
                          style={{
                            width: "18%",
                            margin: "0.5em auto",
                            fontSize: "15px",
                            textAlign: "center"
                          }}
                        >
                          Theme:{user.theme}
                          <br />
                          Created By {user.username}
                        </h3>

                        <div className="containers">
                          <img
                            src={"/images/" + user.theme + ".jpg"}
                            style={{
                              display: "block",
                              width: "100%",
                              height: "auto",
                              margin: "0 auto"
                            }}
                          />
                          <div className="overlay">
                            Explore {user.space_name}
                          </div>
                        </div>
                        {/* <br/>
                      <h3 style={{ width:"28%", margin:"0.5em 2em", fontSize:"15px", display:"flex"}}>Creator:{user.username}</h3> */}
                      </div>
                    </div>
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
