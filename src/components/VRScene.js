import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import "aframe";
import { Entity, Scene } from "aframe-react";
import "aframe-extras";
import axios from "axios";


class VRScene extends Component {
  constructor(props) {
    super(props)
  this.state = {
      background_image: this.props.user.background,
      backgroundPath:""
  };

    //   file: null,
  //   path: "",
  //   theme: "",
  //   space_name: "",
  //   username: ""
  }

  componentDidMount() {
    console.log(this.props)
    if (this.state.background_image === "bali") {
      this.setState({backgroundPath: "/bali.jpg" })
    } 
    else if 
      (this.state.background_image === "nature") {
        this.setState({backgroundPath: "/eq.jpg" })
    } else {
      this.setState({backgroundPath: "/bali.jpg" })
    }
    // else if 
    // (this.state.background === "bali") {
    //   this.setState({backgroundPath: "/bali.jpg" })

    }
  

  // componentDidMount() {
    // const id = this.props.user._id;
    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
    //   .then(response => {
    //     console.log("Hello", response.data.username);
    //     const user = response.data;
    //     this.setState({
    //       username: user.username,
    //       space_name: user.space_name,
    //       theme: user.theme
    //     });
    //   })
    // // const {id} = this.props
    // this.props.getUser()
  // }
  
  render() {
    console.log(this.props);
    
    return (
      <div className="vrscene" >
        <div id="myEmbeddedScene" >
          <Scene id="scene" embedded>
            <a-assets id="assets-id">
             <img id="sky" src={this.state.backgroundPath}></img>
            </a-assets>
            <a-camera position="200 100 0"></a-camera>

            <a-sky src="#sky"></a-sky>

            {/* <a-videosphere src="africa.mp4"></a-videosphere> */}
          </Scene>
         
        </div>
       
      </div>
    );
  }
}

export default withAuth(VRScene);
