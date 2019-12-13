
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import axios from 'axios'


    class SearchBar extends Component {
        
        state = {
            input: "",
           
        };
        
        handleInput = (e) => {
            const { value } = e.target;
            this.props.filterUsers(value)
            this.setState({input: value})
        }
    
        render() {
            return (
                <li  id="search-bar">
                    <input
                    type="text"
                    name = "search"
                    onChange = {this.handleInput}
                    value = {this.state.input}
                    placeholder="Search"
                    />
                    <button id="search-button">Search</button>
                </li>
               
            )
        }
    }
    
    export default withAuth(SearchBar)