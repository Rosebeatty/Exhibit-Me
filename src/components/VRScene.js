import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import "aframe";
import { Scene } from "aframe-react";
import "aframe-extras";


class VRScene extends Component {
  constructor(props) {
    super(props)
  this.state = {
      theme:this.props.user.theme,
      backgroundPath:`/images/${this.props.user.theme}.jpg`,
      
    };
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
            {/* <a-videosphere src="worm.mp4"></a-videosphere> */}
            {/* <a-sound src="src: url(Will.mpeg)" autoplay="true" position="0 2 5"></a-sound> */}
            {/* <a-videosphere src="africa.mp4"></a-videosphere> */}
          </Scene>
         
        </div>
       
      </div>
    );
  }
}

export default withAuth(VRScene);
