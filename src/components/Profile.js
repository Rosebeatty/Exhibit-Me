import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import axios from 'axios'
import Comments from './Comments'


class Profile extends Component {
    state = {
        username: "",
        email: "",
        space_name: "",
        theme: ""
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

        this.setState(username, email, space_name, theme)
    }

    editProfile = (e) => {
        e.preventDefault()

        // const { username, email, space_name, theme } = this.state
        const { id } = this.props

        axios.post(`http://localhost:5000/users/update/${id}`)
            .then((response) => {
                console.log(response)
                const user = response.data;
                this.setState({username: user.username, email: user.email, space_name: user.space_name, theme: user.theme})
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