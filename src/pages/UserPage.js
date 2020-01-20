import React, { Component } from "react";
import UserVRScene from "./../components/UserVRScene";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import UserComments from "../components/UserComments";
import Navbar from "../components/Navbar";

class UserPage extends Component {
  state = {
    users: [],
    user: [],
    fileName: "",
    objects: [],
    file: null,
    objectId:"",
    // path: "",
    theme: "",
    selected: [],
    space_name: "",
    userpath: this.props.location.pathname
  };

  // getUser = (id) => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
  //     .then(response => {
  //       console.log(response);
  //       const user = response.data;
  //       this.setState({
  //           user: user,
  //           theme: user.theme,
  //           space_name: user.space_name,
  //           username: user.username,
  //           objectId:""

  //         });
  //         console.log(this.state.user)
  //       return user
  //     })
  //     .catch(err => console.log(err));
  // };

  uploadFile = () => {
    let { fileName } = this.state;
    console.log(this.state.fileName)
    var assetEl = document.createElement("a-asset-item");
    assetEl.setAttribute(
      "src",
      `${process.env.REACT_APP_API_URL}/images/` + fileName
    );
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
        const user = response.data;
        this.setState({
          user: user,
          theme: user.theme,
          space_name: user.space_name,
          username: user.username,
          objects: user.objects
        });
        this.getAllUsers();
        console.log(this.state.theme);
      })
      .catch(err => {
        console.log(err);
      });

    this.getAllUsers();
    
  };


  getFile = () => {
    console.log(this.state.objects);
    let objectId = this.state.objects.pop();

    axios
      .get(`${process.env.REACT_APP_API_URL}/users/filename/${objectId}`)
      .then(response => {
        console.log("Hello", response.data);
        // let newObjects = response.data.map(object => object._id )
        // let newPath = response.data.pop()
        this.setState({
          fileName: response.data.path
        });
      })
      .catch(err => {
        console.log(err);
      });
    
  };

  getAllUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then(response => {
        console.log(response.data);
        const users = response.data;
        // let themes = users.map(user => user.theme)
        // let bkg = themes.map(theme => theme )
        // let backgroundImg = `/${users.theme}.jpg`
        // console.log(bkg)
        this.setState({ users: users, selected: users });
        this.getFile()
        // this.themeAndUserEqual()
      })
      .catch(err => console.log(err));
  };

  filterUsers = input => {
    console.log(this.state.users);
    console.log(this.state.selected);

    let selected = this.state.users.filter(el => {
      return (
        el.username.toLowerCase().includes(input.toLowerCase()) ||
        el.theme.toLowerCase().includes(input.toLowerCase()) ||
        el.space_name.toLowerCase().includes(input.toLowerCase())
      );
    });

    console.log(selected);
    this.setState({ selected: selected });
  };

  render() {
    return (
      <div id="hover" >
        <Navbar filterUsers={this.filterUsers} />
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}>
          <h2 style={{ padding: "1em 0 0.5em 0" }}>
            Welcome to {this.state.user.username}'s Space{" "}
          </h2>
          <UserVRScene uploadFile={this.uploadFile} theme={this.state.theme} />
          {/* <UserProfile getPathname = {this.getPathname}/> */}
          <UserComments getPathname={this.state.userpath} />
        </div>
        <footer>
          <p>Rose Beatty 2019</p>
        </footer>
      </div>
    );
  }
}

export default withAuth(UserPage);
