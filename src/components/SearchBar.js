import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";

class SearchBar extends Component {
  state = {
    users: [],
    input: "",
    selected: [],
    themes: [],
    selectedThemes: []
    // goHome: false,
  };

  handleInput = e => {
    console.log(this.props);
    const { value } = e.target;
    this.props.filterUsers(value);
    this.setState({ input: value, goHome: true });
  };

  render() {
    return (
      <li>
        <input
          id="search-input"
          type="text"
          name="search"
          onChange={this.handleInput}
          value={this.state.input}
          placeholder="Search..."
        />

        {this.state.input.length > 1 && (
          <Redirect
            to={{
              pathname: "/",
              state: { input: this.state.input }
            }}
          />
        )}
        <button onSubmit={this.submit} type="submit" id="search-button">
          Search
        </button>
      </li>

      // <li id="search-bar">
      //   <input
      //   id="search-input"
      //     type="text"
      //     name="search"
      //     onChange={this.handleInput}
      //     value={this.state.input}
      //     placeholder="Search..."
      //   />

      //   <button id="search-button">Search</button>

      // </li>
    );
  }
}

export default withAuth(SearchBar);
