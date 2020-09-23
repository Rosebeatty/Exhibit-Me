import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import "aframe";
import { Scene } from "aframe-react";
import "aframe-extras";
import axios from "axios";

class UserVRScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user._id,
      backgroundPath: "",
      theme: "",
      isLoaded: false
    };
  }

  getUser = () => {
    let id = this.state.userId;

    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then((response) => {
        const user = response.data;
        this.setState({
          theme: user.theme,
          backgroundPath: `images/${this.props.theme}.jpg`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  upload = async () => {
    let newImg = document.createElement("img");
    newImg.setAttribute("id", "sky");

    newImg.setAttribute("src", `images/${this.props.theme}.jpg`);
    let sky = document.createElement("a-sky");
    let scene = document.getElementById("scene");

    sky.setAttribute("src", "#sky");
    sky.appendChild(newImg);
    scene.appendChild(sky);    
  };
  
  startVR = async () => {
    this.setState({isLoaded:true})
    let node = document.getElementById("startbtn");
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
    await this.props.getFile()
    await this.upload(); 
  }

  render() {
    const { isLoaded } = this.state

    return (
      <div className="vrscene">
        <div id="start" id="myEmbeddedScene">
          <button
            id="startbtn"
            style={{
              color: "white",
              border: "none",
              margin: "12em auto",
              fontSize: "20px",
            }}
            onClick={this.startVR}
          >
            CLICK TO START
          </button>
        { isLoaded ? 
          <Scene id="scene" embedded>
            <a-camera position="40 70 0"></a-camera>
          </Scene>
            : null
        }
        </div>
      </div>
    );
  }
}

export default withAuth(UserVRScene);
