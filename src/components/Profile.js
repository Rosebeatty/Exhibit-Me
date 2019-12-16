import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";
import Comments from "./Comments";
import "aframe-extras";
// import "html2canvas";

class Profile extends Component {
  state = {
    username: "",
    email: "",
    space_name: "",
    theme: "",
    comments: [],
    file: null,
    fileName: "",
    path: "",
    objects: []
  };

  onChangeHandler = e => {
    this.setState({
      file: e.target.files[0]
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let id = this.props.user._id
    let { file } = this.state;
    let formData = new FormData();
    formData.append("file", file);
    
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/users/upload/${id}`, formData, config)
      .then(res => {
        alert("The file was successfully uploaded");
        console.log(res)
      const theFile = this.fileUpload.files[0];
      this.setState({ fileName:theFile.name, objects: res.data.objects });
      this.uploadFile()
      
      })
      .catch(error => {
          console.log(error)
      });

    
   
    // var userId = file.

  }

  uploadFile = () => {
    let { fileName } = this.state;
    var assetEl = document.createElement("a-asset-item");
    assetEl.setAttribute("src", `${process.env.REACT_APP_API_URL}/images/` + fileName);
    assetEl.setAttribute("id", fileName);
    document.getElementById("assets-id").appendChild(assetEl);

    var gltfModelId = "#" + assetEl.id;
    console.log(assetEl.id);

    var entityEl = document.createElement("a-entity");
    entityEl.setAttribute("gltf-model", gltfModelId);
    entityEl.setAttribute("id", "rig");
    entityEl.setAttribute("wasd-controls");
   
    // entityEl.setAttribute("wasd-controls", "adInverted:false");
    // entityEl.setAttribute("wasd-controls", "wsInverted:false");
    entityEl.setAttribute("wasd-controls", "acceleration:5005");
    // entityEl.setAttribute("wasd-controls", "fly:true");
    entityEl.setAttribute("look-controls");
    // entityEl.setAttribute(
    //   "sound",
    //   "src: url(12 Rokthaboat[Twrk].mp3); autoplay: true"
    // );
    document.getElementById("scene").appendChild(entityEl);
    console.log(entityEl);
    
    // var textEl = document.createElement("a-text");
    // textEl.setAttribute("text", "value: Hello");
    // textEl.setAttribute("text", "width: 2.5");
    // textEl.setAttribute("position", "20, 50, 20");
  };

  showForm = () => {
    var editProfileForm = document.getElementById("edit-profile-form");
    editProfileForm.style.display = "block";
    var userDetails = document.getElementById("user-details");
    userDetails.style.display = "none";
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  editProfile = e => {
    e.preventDefault();
    let hideProfileForm = document.getElementById("edit-profile-form");
    hideProfileForm.style.display = "none";
    let userDetails = document.getElementById("user-details");
    userDetails.style.display = "block";

    console.log(this.props.user);
    const { username, email, space_name, theme } = this.state;

    const id = this.props.user._id;

    axios
      .put(`${process.env.REACT_APP_API_URL}/users/update/${id}`, {
        username,
        email,
        space_name,
        theme,
      })
      .then(response => {
        console.log("Hello", response.data);
        // const user = response.data;
        this.setState({ username, email, space_name, theme });
      })
      .catch(err => {
        console.log(err);
      });
  };


  deleteObject = () => {
   let modelId = this.state.objects.pop()

//     const newList = this.state.objects;
//     console.log(newList)
//     let newObjectsList = newList.filter(object => object === modelId.toString());
//   console.log(newObjectsList)

axios.delete(`${process.env.REACT_APP_API_URL}/users/deleteObject/${modelId}`)
.then(response => {
    
    this.setState({path: null, fileName:null})
    let file = document.getElementById('rig')
    file.remove()
      console.log("Hello", response);
    //   const user = response.data;
    //   console.log(user)
    //   this.setState({path: null, file:null})
    //   this.setState({initalComments: user.comments})
  })
  .catch(err => {
      console.log(err);
    });

  }


  componentDidMount = () => {
    console.log(this.props);
    const id = this.props.user._id;
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then(response => {
        console.log("Hello", response.data);
        const user = response.data;
        this.setState({
          username: user.username,
          email: user.email,
          space_name: user.space_name,
          theme: user.theme,
          comments: user.comments
        });
        
      })
      .catch(err => {
        console.log(err);
      });
      axios
      .get(`${process.env.REACT_APP_API_URL}/users/filename`)
      .then(response => {
        console.log("Hello", response.data);
        let newObjects = response.data.map(object => object._id )
        this.setState({
          path:"/" + response.data.pop().path, fileName: response.data.pop().path, objects: newObjects
        });
        this.uploadFile()
        
        console.log(this.state.path)
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    return (
       
      <div id="profile-wrapper">
     
      
          <div className="container env" style={{paddingLeft:"2rem", width:"77.5%"}}>
           <div className="profile-details">
            <a onClick={this.showForm}>
              <h2 style={{color:"black"}}>Edit Profile</h2>
            </a>
            <div id="user-details" >
              <h3>
                Username: <span>{this.state.username}</span>{" "}
              </h3>
              <h3>
                Email: <span>{this.state.email}</span>
              </h3>
              <h3>
                Space Name: <span>{this.state.space_name}</span>
              </h3>
              <h3>
                Theme: <span>{this.state.theme}</span>
              </h3>
            </div>

            <form id="edit-profile-form" onSubmit={this.editProfile}>
              <label>Username:</label>
              <input
                type="text"
                value={this.state.username}
                name="username"
                onChange={this.handleInput}
              ></input>
              <label>Email:</label>
              <input
                type="email"
                value={this.state.email}
                name="email"
                onChange={this.handleInput}
              ></input>
              <label>Space Name:</label>
              <input
                type="text"
                value={this.state.space_name}
                name="space_name"
                onChange={this.handleInput}
              ></input>
              <label>Theme:</label>
              <input
                type="text"
                value={this.state.theme}
                name="theme"
                onChange={this.handleInput}
              ></input>
              <button>Save</button>
              
            </form> 
            </div>
            <div className="profile-details">
        <ul className="env" style={{ display:"flex", flexDirection:"row"}}>
         
         <li><h2>Upload a 3D object into your space (.glb format)</h2>
         <form onSubmit={this.handleSubmit} encType="multipart/form-data" >
           <input
             onChange={this.onChangeHandler}
             type="file"
             name="file"
             ref={ref => (this.fileUpload = ref)}
             style={{paddingLeft:"20%"}}
           />
           <button type="submit" value="upload" >
             Save
           </button>
           <button style={{border:"1px solid black", color:"black", backgroundColor:"transparent", width:"60%"}} onClick={this.deleteObject}>Delete current object</button>
         </form> 
         </li> 
         </ul>
         </div>
       
        </div>

        <Comments comments={this.state.comments}/>

       
      
      </div>
    );
  }
}

export default withAuth(Profile);
