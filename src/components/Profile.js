import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import axios from 'axios'
import Comments from './Comments'


class Profile extends Component {


    render() {
        return (
        <div id="profile-wrapper">
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

           <Comments />
        </div>
        )
    }

}

export default withAuth(Profile);