import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";
import Home from '../pages/Home'

class SearchBar extends Component {
  state = {
    users: [],
    input: "",
    selected: [],
    themes: [],
    selectedThemes: [],
    referrer: ""
    // goHome: false,
  };

  handleInput = e => {
    console.log(this.props);
    const { value } = e.target;
    this.props.filterUsers(value);
    this.setState({ input: value});
    
  };

  goHome = () => {
    this.setState({referrer: '/'});
    
  }

  render() {

    const {referrer} = this.state;

    return (
      <li onClick={this.goHome} className='nav-item' style={{"display":"flex"}}>
        <input
          id="search-input"
          type="text"
          name="search"
          onChange={this.handleInput}
          value={this.state.input}
          placeholder="Search..."
        />
        
        { referrer && <Redirect to={referrer} />}
        {/* {this.state.input.length > 0 && (
          <Redirect
            to={{
              pathname: "/",
              state: { selected: this.state.selected }
            }}
          />
        )} */}
        <button onSubmit={this.submit} type="submit" id="search-button">
          Search
        </button>
      </li>
    );
  }
}

export default withAuth(SearchBar);
