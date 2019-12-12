import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import 'aframe';
import {Entity, Scene} from 'aframe-react';
import axios from 'axios'



class VRScene extends Component {
    state = {
        file: null,
        path: ""
      }
      // this.handleSubmit = this.handleSubmit.bind(this)
      //     this.onChangeHandler = this.onChangeHandler.bind(this)
      //     this.fileUpload = this.fileUpload.bind(this)
    
   
  

  render () {

    console.log(this.state.path)
    return (
      <div className="vrscene">
        
        <div id="myEmbeddedScene">
            <Scene id="scene" embedded>
              <a-sky color="white"></a-sky>
                <a-assets id="assets-id">
                <img id="sky" src="eq.jpg"></img>
                </a-assets>
                <a-camera position="0 100 0"></a-camera> 
                {/* <Entity gltf-model="#chest-obj" camera look-controls position="50 1.6 -100" rotation="0 0 0" scale=".5 1 .5"></Entity> */}
                {/* <Entity gltf-model="#pumpkin-obj" camera look-controls position="200 1.6 120" rotation="0 0 0" scale=".5 1 .5"></Entity> */}
                
              <a-sky src="#sky"></a-sky>
          </Scene>
         <h2 id="vrscene-theme">Theme: #NATURE</h2>
      </div>
     
</div>
    );
  }




}
 


export default withAuth(VRScene)