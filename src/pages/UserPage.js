import React, { Component } from "react";
import VRScene from "./../components/VRScene";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
// import UserProfile from "../components/UserProfile"
import UserComments from "../components/UserComments"
// import Users from "../lib/user-service";
import Navbar from "../components/Navbar";

class UserPage extends Component {
  state = {
    user: [],
    fileName: "",
    objects: [],
    file: null,
    path: "",
    theme: "",
    space_name:"",
    username:"",
    userpath:this.props.location.pathname
  };

  getUser = (id) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then(response => {
        console.log(response);
        const user = response.data;
        this.setState({
            user: user,
            theme: user.theme,
            space_name: user.space_name,
            username: user.username,
            objectId:""
           
          });
          console.log(this.state.user)
        return user
      })
      .catch(err => console.log(err));
  };


  uploadFile = () => {
    let { fileName } = this.state;
    var assetEl = document.createElement("a-asset-item");
    assetEl.setAttribute("src", `${process.env.REACT_APP_API_URL}/images/` + fileName);
    assetEl.setAttribute("id", fileName);
    document.getElementById("assets-id").appendChild(assetEl);

    var gltfModelId = "#" + assetEl.id;
    console.log(assetEl.id);

    var entityEl = document.createElement("a-entity");
    entityEl.setAttribute("gltf-model", gltfModelId);
    entityEl.setAttribute("id", "rig");
    entityEl.setAttribute("wasd-controls");
   
    // entityEl.setAttribute("wasd-controls", "adInverted:false");
    // entityEl.setAttribute("wasd-controls", "wsInverted:false");
    entityEl.setAttribute("wasd-controls", "acceleration:5005");
    // entityEl.setAttribute("wasd-controls", "fly:true");
    entityEl.setAttribute("look-controls");
    // entityEl.setAttribute(
    //   "sound",
    //   "src: url(12 Rokthaboat[Twrk].mp3); autoplay: true"
    // );
    document.getElementById("scene").appendChild(entityEl);
    console.log(entityEl);
    
  };

  componentDidMount = () => {
    const { id } = this.props.match.params; 
    //   let objectId = this.props.user.data.objects[0]
    

 axios
    .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
    .then(response => {
      console.log("Hello", response.data);
      const user = response.data
      this.setState({
       user: user,
       theme: user.theme,
       space_name: user.space_name,
       username: user.username,
      objectId: user.objects
      })
    
    
    })
    .catch(err => {
      console.log(err);
    });
  
    
  }

    // console.log(this.props.user)
    // console.log(this.props.location.pathname);
    // this.getUser(id);

    getFile = () => {
      console.log(this.state.objectId)
      let objectId = this.state.objectId

    axios
    .get(`${process.env.REACT_APP_API_URL}/users/filename/${objectId}`)
    .then(response => {
      console.log("Hello", response.data);
      // let newObjects = response.data.map(object => object._id )
      // let newPath = response.data.pop()
      this.setState({
       fileName: response.data.path
      })
      
        this.uploadFile()
      
    
    })
    .catch(err => {
      console.log(err);
    });
    
  }

  
  
  render() {
    return (
      <div id="hover" onClick={this.getFile}>
        <Navbar />
        <div style={{backgroundColor:'rgba(255, 255, 255, 0.04)'}}>
        <h2 style={{padding:"1em 0 0.5em 0"}}>Welcome to {this.state.user.username}'s Environment </h2>
        <VRScene />
       {/* <UserProfile getPathname = {this.getPathname}/> */}
       <UserComments getPathname = {this.state.userpath}/>
      </div>
        <footer ><p>Rose Beatty 2019</p></footer>
      </div>
    );
  }
}

export default withAuth(UserPage);
