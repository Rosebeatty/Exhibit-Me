import React, { Component } from 'react';
import VRScene from './../components/VRScene'
import Comments from './../components/Comments'
import axios from 'axios'

class UserPage extends Component {
  state = {
      user: []
  }

    getUser = (id) => {
        axios.get(`http://localhost:5000/users/${id}`)
          .then((response) => {
            console.log(response)
            const user = response.data;
            this.setState({user: user})
          })
          .catch((err) => console.log(err))  
      }
    
      componentDidMount() {
          const { id } = this.props.match.params
          console.log(this.props)
          this.getUser(id)
      }
    
  
  
render() {
    return (
      <div>
     <h2>Welcome to {this.state.user.username}'s space </h2>
    <VRScene />
   
    <Comments />
      </div>
    );
  }
}

export default UserPage;
