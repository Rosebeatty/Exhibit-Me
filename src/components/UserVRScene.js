import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import "aframe";
import { Entity, Scene } from "aframe-react";
import "aframe-extras";
import axios from "axios";


class UserVRScene extends Component {
  constructor(props) {
    super(props)
  this.state = {
      userId: this.props.user._id,
      backgroundPath:"",
      theme:""
      
    };
  }

  componentDidMount() {
  
  
  }

  getUser = () => {
   let id = this.state.userId
    //   let objectId = this.props.user.data.objects[0]
   

 axios
    .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
    .then(response => {
      console.log("Hello", response.data);
      const user = response.data
      this.setState({
      
       theme: user.theme,
       backgroundPath: `images/${this.props.theme}.jpg`
       
      })
    this.upload()
    
    })
    .catch(err => {
      console.log(err);
    });
  
  }

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
      
  }

  render() {
    console.log(this.props);
    
    return (
      <div className="vrscene" >
        <div id="myEmbeddedScene" onClick={this.upload}>
          <Scene id="scene" embedded>
            <a-assets id="assets-id">
             {/* <img id="sky" ></img> */}
            </a-assets>
            <a-camera position="40 70 0"></a-camera>

            {/* <a-sky src="#sky"></a-sky> */}

            {/* <a-videosphere src="africa.mp4"></a-videosphere> */}
          </Scene>
         
        </div>
       
      </div>
    );
  }
}

export default withAuth(UserVRScene);
