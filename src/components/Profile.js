import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";
import Comments from "./Comments";
import "aframe-extras";

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
    objects: [],
    backgroundImage:"",
    background: null,
    bkgImages: [],
    fileExists: true
  };

  onChangeHandler = e => {
    this.setState({
      file: e.target.files[0]
    });
  };

  onBkgChangeHandler = e => {
    this.setState({
      background: e.target.files[0]
     
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let id = this.props.user._id
    console.log(this.props.user._id)
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

  }

  handleImageSubmit = e => {
    e.preventDefault();
    let id = this.props.user._id
    let file = this.state.background;
    let formData = new FormData();
    formData.append("file", file);
    console.log(file)
    console.log(this.state.background)
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/users/uploadBackground/${id}`, formData, config)
      .then(res => {
        alert("The file was successfully uploaded");
        console.log(res)
      const theFile = this.backgroundUpload.files[0];
      this.setState({ backgroundImage:theFile.name, bkgImages: res.data.backgrounds });
      this.uploadBackground()
      
      })
      .catch(error => {
          console.log(error)
      });

  }

  uploadBackground = () => {
    console.log(this.state.backgroundImage)
    let { backgroundImage } = this.state;
  
    var assetImg = document.createElement("img");
    assetImg.setAttribute("src", `${process.env.REACT_APP_API_URL}/images/` + backgroundImage);
    assetImg.setAttribute("id", backgroundImage);
    assetImg.setAttribute("crossorigin", "anonymous");
    document.getElementById("assets-id").appendChild(assetImg)
    
    var skyId = '#' + assetImg.id;

    var bkgImg = document.createElement('a-sky')
    bkgImg.setAttribute("src", skyId);
    document.getElementById("scene").appendChild(bkgImg);
    console.log(bkgImg);
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
    
  };

  showForm = (e) => {
    e.preventDefault();
    const editProfileForm = document.getElementById("edit-profile-form");
    editProfileForm.style.display = "block";
    const userDetails = document.getElementById("user-details");
    userDetails.style.display = "none";
  };

  showCreateButton = () => {
      const createButton = document.getElementById("create-btn");
      createButton.style.display = "block";
      const uploadForm = document.getElementById("upload");
      uploadForm.style.display = "none";
  }

  showBkgCreateButton = () => {
    const createButton = document.getElementById("create-bkg-btn");
    createButton.style.display = "block";
    const uploadForm = document.getElementById("upload-bkg");
    uploadForm.style.display = "none";
}

  showUpload = (e) => {
    e.preventDefault();
    const uploadForm = document.getElementById("upload");
    uploadForm.style.display = "block";
    const createButton = document.getElementById("create-btn");
    createButton.style.display = "none";
  };

  showImageUpload = (e) => {
    e.preventDefault();
    const uploadForm = document.getElementById("upload-bkg");
    uploadForm.style.display = "block";
    const createButton = document.getElementById("create-bkg-btn");
    createButton.style.display = "none";
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


axios.delete(`${process.env.REACT_APP_API_URL}/users/deleteObject/${modelId}`)
.then(response => {
    
    this.setState({path: null, fileName:null})
    let file = document.getElementById('rig')
    file.remove()
      console.log("Hello", response);
    //   const user = response.data;
    //   console.log(user)
      this.setState({path: null, file:null})
    //   this.setState({initalComments: user.comments})
  })
  .catch(err => {
      console.log(err);
    });

  }

  deleteBackground = () => {
    let backgroundId = this.state.backgroundId
    console.log(this.state.backgroundId)
 
 axios.delete(`${process.env.REACT_APP_API_URL}/users/deleteBackground/${backgroundId}`)
 .then(response => {
     
     this.setState({ backgroundImage:null})
     let file = document.getElementById(this.state.backgroundImage)
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

   noFile = (e) => {
     e.preventDefault()
    if (this.state.fileExists === false) {

    }
   }
  
  componentDidMount = () => {
    let id = this.props.user._id  

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
          path:null, fileName: response.data.pop().path, objects: newObjects
        });
      this.uploadFile()
      
      if(this.state.fileName === "") {
        this.setState({fileExists: false})
      }
        console.log(this.state.path)
      })
      .catch(err => {
        console.log(err);
      });

    //   axios
    // .get(`${process.env.REACT_APP_API_URL}/users/getBackground`)
    // .then(response => {
    //   console.log("Hello", response);
    //   let newBackground = response.data.map(image => image._id )
    //   let backgroundId = response.data._id
    //   this.setState({
    //     backgroundImage: response.data[0].path, background:newBackground, backgroundId: backgroundId
    //   });
    //   this.uploadBackground()
      
    //   console.log(this.state.path)
    // })
    // .catch(err => {
    //   console.log(err);
    // });


   
   
  }
  

  startBackground = () => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/users/getBackground`)
    .then(response => {
      console.log("Hello", response);
      let newBackground = response.data.map(image => image._id )
      let backgroundId = response.data._id
      this.setState({
        backgroundImage: response.data[0].path, background:newBackground, backgroundId: backgroundId
      });
      this.uploadBackground()
      
      console.log(this.state.path)
    })
    .catch(err => {
      console.log(err);
    });

  }

  render() {
    return (
       
      <div onClick={this.startBackground} id="profile-wrapper"> 
          <div className="container env" >
           <div className="profile-details extra-details">
            <h1 style={{textAlign:"left", textDecoration:"underline"}}>{this.state.space_name}</h1>
            <div id="user-details" >
           
              <h3>
                Username: <span>{this.state.username}</span>{" "}
              </h3>
              <h3>
                Email: <span>{this.state.email}</span>
              </h3>
              <h3>
                Theme: <span>{this.state.theme}</span>
              </h3>

              <div style={{marginTop:"2em", fontSize:"10px"}}>
              <a href="" onClick={this.showForm} >
              <h2 style={{color:"white", border:"1px solid white", width:"45%", padding:"10px", textAlign:"center"}}>Edit Profile</h2>
            </a>
            </div>
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
              <button style={{color:"white"}}>Save</button>
            </form> 
            </div>
            <div id="create-delete" className="profile-details">
            <button style={{color:"white", width:"70%"}} id="create-bkg-btn" onClick={this.showImageUpload}>Create / Delete Background</button>
            <div  id="upload-bkg" style={{display:"none"}}>
               <ul className="env" style={{ display:"flex", flexDirection:"row", padding:"1em"}}>
                    <li>
                
                        <h2>Upload a 3D background into your space </h2>
                        
                        {  this.state.fileExists ?
                          <form onSubmit={this.handleImageSubmit} encType="multipart/form-data" >
                          <input
                            onChange={this.onBkgChangeHandler}
                            type="file"
                            name="file"
                            ref={ref => (this.backgroundUpload = ref)}
                            style={{paddingLeft:"20%"}}
                        />
                          
                        <button onClick={this.showBkgCreateButton} type="submit" value="upload" style={{color:"white"}}>
                            Save
                        </button>
                        
                        <a onClick={this.deleteBackground} style={{border:"1px solid white", color:"white", backgroundColor:"transparent", width:"60%"}}>
                        Delete current background
                        </a>
                        </form>
                          :  
                         <form onSubmit={this.noFile} encType="multipart/form-data" >
                         <input
                            onChange={this.onBkgChangeHandler}
                            type="file"
                            name="file"
                            ref={ref => (this.backgroundUpload = ref)}
                            style={{paddingLeft:"20%"}}
                        />
                          
                        <button onClick={this.showBkgCreateButton} type="submit" value="upload" style={{color:"white"}}>
                            Save
                        </button>
                        
                        <button onClick={this.deleteBackground} style={{border:"1px solid white", color:"white", backgroundColor:"transparent", width:"60%"}}>
                        Delete current background
                        </button>
                        </form>
                        }
             
                   </li> 
                </ul>
              </div>
            <button id="create-btn" onClick={this.showUpload}>Create / Delete Object</button>
            <div className="profile-details" id="upload">
            
                <ul className="env" style={{ display:"flex", flexDirection:"row", padding:"1em"}}>
                    <li>
                        <h2>Upload a 3D object into your space </h2>
                        <p style={{fontSize:"12px"}}>(.glb format)</p>
                       
                       
                      
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data" >
                        <input
                            onChange={this.onChangeHandler}
                            type="file"
                            name="file"
                            ref={ref => (this.fileUpload = ref)}
                            style={{paddingLeft:"20%"}}
                        />
                        <button onClick={this.showCreateButton} type="submit" value="upload" style={{color:"white"}}>
                            Save
                        </button>
                        <a style={{border:"1px solid white", color:"white", backgroundColor:"transparent", width:"60%"}} onClick={this.deleteObject}>Delete current object</a>
                        </form> 
                        
                        
                    </li> 
                </ul>
         </div>
         </div>
       
        </div>
        {/* <hr style={{border:"0.5px solid grey", width:"70%", margin: "0 auto"}}/> */}
        <Comments comments={this.state.comments}/>

       
       
      </div>
    );
  }
}

export default withAuth(Profile);
