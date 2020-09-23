import React, { Component } from "react";
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
    objects: [],
  };

  onChangeHandler = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let id = this.props.user._id;
    let { file } = this.state;

    if (file) {
    let formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/upload/${id}`,
        formData,
        config
      )
      .then((res) => {
        alert("The file was successfully uploaded");
        const theFile = this.fileUpload.files[0];
        this.setState(prevState => ({...prevState, fileName: theFile.name, objects: res.data.objects }));

        this.uploadFile();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  uploadFile = () => {
    let { fileName } = this.state;
    var assetEl = document.createElement("a-asset-item");
    assetEl.setAttribute(
      "src",
      `${process.env.REACT_APP_API_URL}/images/` + fileName
    );
    assetEl.setAttribute("id", fileName);
    document.getElementById("assets-id").appendChild(assetEl);

    var gltfModelId = "#" + assetEl.id;

    var entityEl = document.createElement("a-entity");
    entityEl.setAttribute("gltf-model", gltfModelId);
    entityEl.setAttribute("id", "rig");
    entityEl.setAttribute("wasd-controls");
    entityEl.setAttribute("wasd-controls", "acceleration:5005");
    entityEl.setAttribute("look-controls");
    document.getElementById("scene").appendChild(entityEl);
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
  };

  showUpload = (e) => {
    e.preventDefault();
    const uploadForm = document.getElementById("upload");
    uploadForm.style.display = "block";
    const createButton = document.getElementById("create-btn");
    createButton.style.display = "none";
  };

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  editProfile = (e) => {
    e.preventDefault();
    let hideProfileForm = document.getElementById("edit-profile-form");
    hideProfileForm.style.display = "none";
    let userDetails = document.getElementById("user-details");
    userDetails.style.display = "block";

    const { username, email, space_name, theme } = this.state;

    const id = this.props.user._id;

    axios
      .put(`${process.env.REACT_APP_API_URL}/users/update/${id}`, {
        username,
        email,
        space_name,
        theme,
      })
      .then((res) => {
        this.setState({ username, email, space_name, theme });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteObject = () => {
    let modelId = this.state.objects.pop();

    axios
      .delete(`${process.env.REACT_APP_API_URL}/users/deleteObject/${modelId}`)
      .then((res) => {
        let file = document.getElementById("rig");
        file.remove();
        this.setState({ fileName: null, file: null });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    let id = this.props.user._id;
    
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then((response) => {
        const user = response.data;
        this.setState({
          username: user.username,
          email: user.email,
          space_name: user.space_name,
          theme: user.theme,
          comments: user.comments,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    };

  render() {
    const enabled = this.state.file !== null;

    return (
      <div
        id="profile-wrapper"
      >
        <div className="container env">
          <div className="profile-details extra-details">
            <h1 id="space-name">{this.state.space_name}</h1>
            <div id="user-details">
              <h3>
                Username: <span>{this.state.username}</span>{" "}
              </h3>
              <h3>
                Email: <span>{this.state.email}</span>
              </h3>
              <h3>
                Theme: <span>{this.state.theme}</span>
              </h3>

              <div>
                <div onClick={this.showForm}>
                  <h2 id="edit-profile-btn">Edit Profile</h2>
                </div>
              </div>
            </div>
            <form
              id="edit-profile-form"
              onSubmit={this.editProfile}
              style={{ paddingTop: "0" }}
            >
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
              <button id="save-profile-btn">Save</button>
            </form>
          </div>
          <button id="create-btn" onClick={this.showUpload}>
            Create / Delete Object
          </button>
          <div className="profile-details" id="upload">
            <ul className="env upload-obj">
              <li>
                <h2>Upload a 3D Object Into Your Space </h2>
                <p style={{ fontSize: "12px", marginBottom: "0.5em" }}>
                  (glb format)
                </p>

                <form
                  onSubmit={this.handleSubmit}
                  encType="multipart/form-data"
                >
                  <input
                    onChange={this.onChangeHandler}
                    type="file"
                    name="file"
                    ref={(ref) => (this.fileUpload = ref)}
                    style={{
                      color: "black",
                      backgroundColor: "white",
                      margin: "0 auto",
                      width: "70%",
                    }}
                  />
                  <button
                    id="save-object-btn"
                    onClick={this.showCreateButton}
                    type="submit"
                    value="upload"
                    disabled={!enabled}
                  >
                    Save
                  </button>
                </form>
                  <button
                    style={{
                      border: "1px solid white",
                      color: "white",
                      backgroundColor: "#2ab193e5",
                      width: "40%",
                      textAlign: "center",
                      padding: "0.6em",
                      margin: "1em auto",
                      cursor: "pointer",
                    }}
                    onClick={this.deleteObject}
                  >
                    Delete current object
                  </button>
              </li>
            </ul>
          </div>
        </div>

        <Comments comments={this.state.comments} />
      </div>
    );
  }
}

export default withAuth(Profile);
