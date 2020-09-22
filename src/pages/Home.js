import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import Profile from "../components/UserVRScene";
import queryString from 'query-string';

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
        const users = response.data;
        let themes = users.map(user => user.theme);
        // let bkg = themes.map(theme => theme )
        // let backgroundImg = `/${users.theme}.jpg`
        this.setState({ users: users, selected: users, themes: themes });
        // this.themeAndUserEqual()
        this.handleSearch()
      })
      .catch(err => console.log(err));
  };

  componentDidMount = async () => {
    await this.getAllUsers();
    window.scrollTo(0,0);
 
  };

  filterUsers = input => {
    console.log(input);
    let selected = this.state.users.filter(el => {
      return (
        el.username.toLowerCase().includes(input.toLowerCase()) ||
        el.theme.toLowerCase().includes(input.toLowerCase()) ||
        el.space_name.toLowerCase().includes(input.toLowerCase())
      );
    });
    if (selected.length > 0) {
    this.setState({ selected: selected });
    }
    else {
      return;
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      console.log('updated')
      this.handleSearch();
    }  
  }

  handleSearch = () => {
    const values = queryString.parse(this.props.location.search)
    console.log(values)
    if(values.search) {
      this.filterUsers(values.search)
    }
}

  render() {
    return (
      <div>
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

            { this.state.selected.map(user => {
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
                      <h1>{user.space_name} </h1>
                      <div>
                        <h2
                          style={{
                            margin: "0.5em auto",
                            fontSize: "15px",
                            textAlign: "center"
                          }}
                        >
                          Theme:{user.theme}
                          <br />
                          Created By {user.username}
                        </h2>

                        <div className="containers">
                          <img
                            src={"/images/" + user.theme + ".jpg"}
                            style={{
                              display: "block",
                              width: "100%",
                              height: "auto",
                              margin: "0 auto"
                            }}
                            alt="background"
                          />
                          <div className="overlay">
                            Explore {user.space_name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }) }
          </div>
        </div>
        <footer>Rose Beatty 2020</footer>
      </div>
    );
  }
}

export default withAuth(Home);
