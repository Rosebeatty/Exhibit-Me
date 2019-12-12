import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import axios from 'axios'
import Comments from './Comments'


class Profile extends Component {
    state = {
       
    }

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

    showForm = () => {
        var editProfileForm = document.getElementById('edit-profile-form')
        editProfileForm.style.display = 'block';
    }

    hideForm = () => {
        var hideProfileForm = document.getElementById('edit-profile-form')
        hideProfileForm.style.display = 'none';
    }

    handleInput = (event) => {
        const { username, email, space_name, theme } = event.target;

        this.setState({username, email, space_name, theme})
    }

    editProfile = (e) => {
        e.preventDefault()
        console.log(this.props.user)
        // const { username, email, space_name, theme } = this.state
        const id  = this.props.user._id

        axios.put(`http://localhost:5000/users/update/${id}`)
            .then((response) => {
                console.log(response.data)
                // const user = response.data;
                // this.setState({username: user.username, email: user.email, space_name: user.space_name, theme: user.theme})
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
        <div id="profile-wrapper">
            <div id="edit-wrapper">
            <div className="container env">
                <a onClick={this.showForm}><h2>Edit Profile</h2></a>
                <h3>Username: <span>{this.state.username}</span> </h3>
                <h3>Email: <span>rose.beatty@gmail.com</span></h3>
                <h3>Space Name: <span>Nature Space</span></h3>
                <h3>Theme: <span>#Nature</span></h3>

                <form id="edit-profile-form" onSubmit={this.editProfile}>
                <label>Username:</label>
                <input onChange={this.handleInput} type="text"></input>
                <label>Email:</label>
                <input onChange={this.handleInput} type="text"></input>
                <label>Space Name:</label>
                <input onChange={this.handleInput} type="text"></input>
                <label>Theme:</label>
                <input onChange={this.handleInput} type="text"></input>
                <button onClick={this.hideForm}>Make Changes</button>
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

           <Comments />
        </div>
        )
    }

}

export default withAuth(Profile);