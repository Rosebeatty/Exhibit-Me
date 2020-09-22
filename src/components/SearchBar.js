import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";

class SearchBar extends Component {
  state = {
    users: [],
    input: "",
    selected: [],
    themes: [],
    selectedThemes: [],
    referrer: ""
  };

  handleSearch = (e) => {
    const { value } = e.target;
    this.setState({input: value})
  }

  searchSubmit = (e) => {
    this.props.submit(e, this.state.input);
    this.setState({input: ''});
  }

  goHome = () => {
    this.setState({referrer: '/'});
  }

  render() {
    return (
      <li  className='nav-item' style={{"display":"flex"}}>
       <form onSubmit={(e) => this.searchSubmit(e)} id="search-bar">
        <label htmlFor="search-input" className="hidden"></label>
        <input
          id="search-input"
          type="search"
          onChange={this.handleSearch}
          value={this.state.input}
          placeholder="Search..."
        />
        <button type="submit" id="search-button">
          Search
        </button>
        </form>
      </li>
    );
  }
}

export default withAuth(SearchBar);
