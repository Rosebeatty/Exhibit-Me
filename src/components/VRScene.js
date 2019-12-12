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
         <div className="vrscene-h1">
            <h1>Welcome back to ENV NAME, Rose</h1>
        </div>
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
      <div id="edit-wrapper">
      <div className="container env">
        <a><h2>Edit Profile</h2></a>
        <h3>Username: <span>Rose</span> </h3>
        <h3>Email: <span>rose.beatty@gmail.com</span></h3>
        <h3>Environment Name: <span>Nature Space</span></h3>
        <h3>Theme: <span>#Nature</span></h3>

        <form id="edit-profile-form">
          <input type="text"></input>
        </form>
      </div>
     <div className = "container env">
        <h2>Upload 3D object (.glb format)</h2>
        <form  
         onSubmit={this.handleSubmit} 
         encType='multipart/form-data'>
          <input onChange={this.onChangeHandler} type="file" name="file"  ref={(ref) => this.fileUpload = ref}/>
          <button type="submit" value="upload" >Save</button>
        </form>
    </div>
     
      </div>

      <div id="comments-wrapper">
        <h3>400 Comments</h3>
        <div className="comment">
            <p>Rose 1 week ago</p>
            <p>HelloThereHelloThereHelloThereHelloThereHelloThereHelloThereHelloThereHelloThereHelloThere</p>
            <p>Reply</p>
            <hr/>
        </div>
      </div>
</div>
    );
  }




}
 


export default withAuth(VRScene)