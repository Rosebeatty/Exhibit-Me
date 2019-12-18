import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";
import VRScene from "../components/VRScene"
import UserComments from "../components/UserComments"


class UserProfile extends Component {
    state = {
    file: null,
    fileName: "",
    objects: [],
    }

    componentDidMount () {
        const id = this.props.user._id

        axios
        .get(`${process.env.REACT_APP_API_URL}/users/filename/${id}`)
        .then(response => {
          console.log("Hello", response.data);
          let newObjects = response.data.map(object => object._id )
          this.setState({
            path:null, fileName: response.data.pop().path, objects: newObjects
          });
         
        })
        .catch(err => {
          console.log(err);
        });
       
    }

    render() {
        return(
            <div>
           
            <UserComments />
            </div>
        )

    }

}

export default UserProfile