
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import axios from 'axios'

class SearchBar extends Component {
    state = {
        input: ""
    }

    handleInput = () => {
        
    }

    render() {
        return (
    <div></div>
        )
    }

}

export default withAuth(SearchBar)