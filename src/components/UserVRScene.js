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
      theme: ""
    };
  }

  getUser = () => {
    let id = this.state.userId;
    //   let objectId = this.props.user.data.objects[0]

    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then(response => {
        console.log("Hello", response.data);
        const user = response.data;
        this.setState({
          theme: user.theme,
          backgroundPath: `images/${this.props.theme}.jpg`
        });
        // this.upload()
      })
      .catch(err => {
        console.log(err);
      });
  };

  upload = () => {
    console.log(this.state.backgroundPath);
      let newImg = document.createElement('img')
      newImg.setAttribute('id', 'sky');

      newImg.setAttribute('src', `images/${this.props.theme}.jpg`)
      let sky = document.createElement('a-sky')
      let scene = document.getElementById('scene')

      sky.setAttribute('src', '#sky')
      sky.appendChild(newImg)
      scene.appendChild(sky)
      this.props.uploadFile()
      console.log(this.props);
      
  }

  startVR = () => {
    let node = document.getElementById("startbtn");
    
    this.upload()
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  };

  render() {
    console.log(this.props);

    return (
      <div className="vrscene">
        <div id="start" id="myEmbeddedScene" >
          <button
            id="startbtn"
            style={{
              color: "white",
              border: "none",
              margin: "12em auto",
              fontSize: "20px"
            }}
            onClick={this.startVR}
          >
            CLICK TO START
          </button>
          <Scene id="scene" embedded>
            <a-assets id="assets-id">{/* <img id="sky" ></img> */}</a-assets>
            <a-camera position="40 70 0"></a-camera>

            {/* <a-sky src="#sky"></a-sky> */}

            {/* <a-videosphere src="worm.mp4"></a-videosphere> */}
          </Scene>
        </div>
      </div>
    );
  }
}

export default withAuth(UserVRScene);
