import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import "aframe";
import { Scene } from "aframe-react";
import "aframe-extras";


class VRScene extends Component {
    state = {
      theme: this.props.user.theme,
      backgroundPath:`/images/${this.props.user.theme}.jpg`,
      
    };

  render() {
    return (
      <div className="vrscene" >
        <div id="myEmbeddedScene">
          <Scene id="scene" embedded>
            <a-assets id="assets-id">
             <img alt="background-img" id="sky" src={this.state.backgroundPath}></img>
            </a-assets>
            <a-camera position="40 10 0"></a-camera>
            <a-sky src="#sky"></a-sky>
          </Scene>
         
        </div>
       
      </div>
    );
  }
}

export default withAuth(VRScene);
