import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import Profile from '../components/VRScene'


class Home extends Component {
  state = {
    users: [],
    selected: [],
    themes:[],
    selectedThemes: []
  };

  getAllUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then(response => {
        console.log(response.data[0].username);
        const users = response.data;
        let themes = users.map(user => user.theme)
        console.log(themes)
        this.setState({ users: users, selected: users, themes:themes });
        // this.themeAndUserEqual()
      })
      .catch(err => console.log(err));
  };


  themeAndUserEqual = () => {
    for (let i=0;i<=this.state.users.length;i++) {
    console.log(this.state.users.theme[i])
    }
  }


  componentDidMount = () => {
    this.getAllUsers()
   
  }
 

  filterUsers = input => {
    console.log(this.state.users);
    console.log(this.state.selected);

  
    let selected = this.state.users.filter(el => {
        return el.username.toLowerCase().includes(input.toLowerCase()) || 
        el.theme.toLowerCase().includes(input.toLowerCase()) ||
        el.space_name.toLowerCase().includes(input.toLowerCase())
      });
 
   
    console.log(selected);
    this.setState({ selected: selected});
  };



  render() {
    return (
      <div>
        <Navbar filterUsers={this.filterUsers} />
        
     
            <div style={{backgroundColor:'rgba(255, 255, 255, 0.04)', padding:"1.2em 2em"}}>
            <h1 style={{textAlign:"left", margin:"0.5em auto", width:"77%" }}>Discover New Places To Visit</h1>
            
            <div>
          
            {/* {this.state.themes.map((theme,index) => {
                return (
                  <div key={index} >
                     <p style={{padding:"1.5em", marginTop:"1em", display:"flex", flexDirection:"column", textAlign:"left"}}>
                     
                     {theme}</p> 
                       
                  </div>
                 
                );
              })} */}
             
              
                <div style={{display:"none"}}>
                <Profile/>
              </div>
              
              {   
                  this.state.selected.map(user => {
                return (
                  <div key={user._id} className="one-user">
                    <Link to={`/${user._id}`}>
                    <h3 style={{ width:"80%", margin:"0 auto"}}>{user.space_name}</h3>
                    <h3 style={{borderBottom:"1px solid grey",  width:"80%", margin:"0 auto"}}>{user.theme}</h3>
                    
                      <h3 style={{ width:"80%", margin:"0 auto"}}>Creator: {user.username}</h3>
                       
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
