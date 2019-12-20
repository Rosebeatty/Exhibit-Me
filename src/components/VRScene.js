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
      theme:this.props.user.theme,
      backgroundPath:`/images/${this.props.user.theme}.jpg`,
      
    };
  }

  componentDidMount() {
   console.log(this.props);
  
   
  }


  render() {
    console.log(this.props);
    
    return (
      <div className="vrscene" >
        <div id="myEmbeddedScene">
          <Scene id="scene" embedded>
            <a-assets id="assets-id">
             <img id="sky" src={this.state.backgroundPath}></img>
            </a-assets>
            <a-camera position="40 10 0"></a-camera>

            <a-sky src="#sky"></a-sky>

            {/* <a-videosphere src="africa.mp4"></a-videosphere> */}
          </Scene>
         
        </div>
       
      </div>
    );
  }
}

export default withAuth(VRScene);
