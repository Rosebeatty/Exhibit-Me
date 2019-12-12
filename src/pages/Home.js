import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { withAuth } from '../lib/AuthProvider';

class Home extends Component {
  state = {
   users: []
  }

  getAllUsers = () => {
    axios.get('http://localhost:5000/users')
      .then((response) => {
        console.log(response.data[0].username)
        const users = response.data;
        this.setState({users: users})
      })
      .catch((err) => console.log(err))  
  }

  componentDidMount() {
      this.getAllUsers()
  }


  render() {
    return (
      <div>
     <h1>Welcome to Exhibit Me</h1>
      <div>
      { 
        
          this.state.users.map((user) => {
                  return (
                      <div key={user._id} className="user">
                            <Link to={`/${user._id}`}>
                                <h3>{user.username}</h3>
                            </Link>
                        </div>
                    )
                })
            
      }
    
      </div>

      </div>
    );
  }
}

export default withAuth(Home);
