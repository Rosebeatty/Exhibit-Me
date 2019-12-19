import React, { Component } from "react";
import VRScene from "./../components/VRScene";
import EditProfile from "./../components/Profile";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";


class Profile extends Component {
  state = {
    users: [],
    username: "",
    space_name: "",
    theme: "",
    background_image:"",
    backgroundPath: ""
  };

  componentDidMount() {
    const id = this.props.user._id;
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then(response => {
        console.log("Hello", response.data.username);
        const user = response.data;
        this.setState({
          user: user,
          username: user.username,
          space_name: user.space_name,
          theme: user.theme,
          background_image: user.background,
        });
        this.getAllUsers()
       
      })
      .catch(err => {
        console.log(err);
      });
     
    }

    getAllUsers = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users`)
        .then(response => {
          console.log(response.data[0].username);
          const users = response.data;
          let themes = users.map(user => user.theme)
          console.log(themes)
          this.setState({ users: users, selected: users, themes:themes });
         
        })
        .catch(err => console.log(err));
    };
  
  
    // filterUsers = input => {
    //   console.log(this.state.users);
    //   console.log(this.state.selected);
  
    
    //   let selected = this.state.users.filter(el => {
    //       return el.username.toLowerCase().includes(input.toLowerCase()) || 
    //       el.theme.toLowerCase().includes(input.toLowerCase()) ||
    //       el.space_name.toLowerCase().includes(input.toLowerCase())
    //     });
   
     
    //   console.log(selected);
    //   this.setState({ selected: selected});
    // };

  render() {
    return (
      <div>
        <Navbar />
        <div style={{backgroundColor:'rgba(255, 255, 255, 0.04)'}}>
        <div className="vrscene-h1">
          <h1 style={{marginTop:"0.5em"}}>
            Welcome back to {this.state.space_name}, {this.state.username}
          </h1>
        </div>
        <VRScene background = {this.background} />
        <EditProfile  />
        </div>
        
        <footer ><p>Rose Beatty 2019</p></footer>
        
      </div>
    );
  }
}

export default withAuth(Profile);
