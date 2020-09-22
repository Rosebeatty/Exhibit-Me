import React, { Component } from "react";
import UserVRScene from "./../components/UserVRScene";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import UserComments from "../components/UserComments";

class UserPage extends Component {
  state = {
    users: [],
    user: [],
    fileName: "",
    objects: [],
    file: null,
    objectId:"",
    theme: "",
    selected: [],
    space_name: "",
    userpath: this.props.location.pathname
  };

  uploadFile = () => {
    let { fileName } = this.state;
    var assetEl = document.createElement("a-asset-item");
    assetEl.setAttribute(
      "src",
      `${process.env.REACT_APP_API_URL}/images/` + fileName
    );
    assetEl.setAttribute("id", fileName);
    document.getElementById("assets-id").appendChild(assetEl);

    var gltfModelId = "#" + assetEl.id;

    var entityEl = document.createElement("a-entity");
    entityEl.setAttribute("gltf-model", gltfModelId);
    entityEl.setAttribute("id", "rig");
    entityEl.setAttribute("wasd-controls");
    entityEl.setAttribute("wasd-controls", "acceleration:5005");
    entityEl.setAttribute("look-controls");
    document.getElementById("scene").appendChild(entityEl);
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;

    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then(response => {
        const user = response.data;
        this.setState({
          user: user,
          theme: user.theme,
          space_name: user.space_name,
          username: user.username,
          objects: user.objects
        })
        
      })
      .catch(err => {
        console.log(err);
      });

    this.getAllUsers();
  
  };

  loadFile = async (objectId) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL}/users/filename/${objectId}`)
        .then(response => {
          this.setState({
            fileName: response.data.path
          });
        })
        .catch(err => {
          console.log(err);
        })
  }

  getFile =  () => {
    let { objects } = this.state;
    let objectId = objects.pop();
    if (objects.length > 0) {
      return this.loadFile(objectId); 
    }
    //Add pop-up to suggest adding files
  };

  getAllUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then(response => {
        const users = response.data;
        this.setState({ users: users, selected: users });
      })
      .catch(err => console.log(err));
  };

  filterUsers = input => {
    let selected = this.state.users.filter(el => {
      return (
        el.username.toLowerCase().includes(input.toLowerCase()) ||
        el.theme.toLowerCase().includes(input.toLowerCase()) ||
        el.space_name.toLowerCase().includes(input.toLowerCase())
      );
    });

    this.setState({ selected: selected });
  };

  render() {
    return (
      <div id="hover" >
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}>
          <h2 style={{ padding: "1em 0 0.5em 0" }}>
            Welcome to {this.state.user.username}'s Space{" "}
          </h2>
          <UserVRScene startVR={this.startVR} getFile={this.getFile} uploadFile={this.uploadFile} theme={this.state.theme} objects={this.state.objects}/>
          <UserComments getPathname={this.state.userpath} />
        </div>
        <footer>
          <p>Rose Beatty 2020</p>
        </footer>
      </div>
    );
  }
}

export default withAuth(UserPage);
