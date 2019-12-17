import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import "aframe";
import { Entity, Scene } from "aframe-react";
import "aframe-extras";
import axios from "axios";


class VRScene extends Component {
  state = {
    // file: null,
    // path: "",
    theme: "",
    space_name: "",
    username: ""
  };
  // this.handleSubmit = this.handleSubmit.bind(this)
  //     this.onChangeHandler = this.onChangeHandler.bind(this)
  //     this.fileUpload = this.fileUpload.bind(this)

  componentDidMount() {
    const id = this.props.user._id;
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then(response => {
        console.log("Hello", response.data.username);
        const user = response.data;
        this.setState({
          username: user.username,
          space_name: user.space_name,
          theme: user.theme
        });
       
      })
      .catch(err => {
        console.log(err);
      });
    // const {id} = this.props
    // this.props.getUser(id)
  }

  render() {
    console.log(this.props);
    
    return (
      <div className="vrscene" >
        <div id="myEmbeddedScene" >
          <Scene id="scene" embedded>
            <a-sky color="white"></a-sky>
            <a-assets id="assets-id">
              {/* <img id="sky" src="bali.jpg"></img> */}
            </a-assets>
            <a-camera position="200 100 0"></a-camera>

            {/* <a-sky src="#sky"></a-sky> */}

            {/* <a-videosphere src="africa.mp4"></a-videosphere> */}
          </Scene>
          {/* <hr style={{marginTop:"1.5em"}}/> */}
          {/* <h1 style={{textAlign:"center", textDecoration:"underline", borderBottom:"1px solid grey", padding:"0.4em 0"}}>{this.state.space_name}</h1> */}
          {/* <h2 id="vrscene-theme" style={{borderBottom:"1px solid grey", padding:"0.4em 0"}} >Theme: {this.state.theme} </h2> */}
        </div>
       
      </div>
    );
  }
}

export default withAuth(VRScene);
