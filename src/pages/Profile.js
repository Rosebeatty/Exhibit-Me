import React, { Component } from 'react';
import VRScene from './../components/VRScene'
import ProfileComp from './../components/Profile'

class Profile extends Component {
  render() {
    return (
      <div>
       <div className="vrscene-h1">
            <h1>Welcome back to ENV NAME, Rose</h1>
        </div>
    <VRScene />
    <ProfileComp />
      </div>
    );
  }
}

export default Profile;
