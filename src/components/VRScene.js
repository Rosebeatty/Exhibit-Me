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
    
      onChangeHandler = e =>{
        this.setState({
         file: e.target.files[0],
         
        })
    }    
    handleSubmit = (e) => {
        e.preventDefault();
        let { file } = this.state
        let formData = new FormData();
        formData.append('file', file);
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
      
        axios.post("http://localhost:5000/users/upload", formData, config)
            .then( (res) => {
             
                alert("The file was successfully uploaded");
            }).catch((error) => {
        });
      

    const theFile = this.fileUpload.files[0];
    this.setState({ path: "/" + theFile.name });

    console.log(theFile)
    // var userId = file.

    var assetEl = document.createElement('a-asset-item');
    assetEl.setAttribute('src', "http://localhost:5000/" + file.name);
    assetEl.setAttribute('id', file.name);
    document.getElementById('assets-id').appendChild(assetEl);
    
    var gltfModelId = '#' + assetEl.id
    console.log(assetEl.id);
     
    var entityEl = document.createElement('a-entity');
    entityEl.setAttribute('gltf-model', gltfModelId);
    entityEl.setAttribute('sound', "src: url(12 Rokthaboat[Twrk].mp3); autoplay: true");
    document.getElementById('scene').appendChild(entityEl);
    console.log(entityEl)


    var textEl = document.createElement('a-text');
    textEl.setAttribute('text', "value: Hello");
    textEl.setAttribute('text', "width: 2.5");
    textEl.setAttribute('position', "20, 50, 20");
    }  
  

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