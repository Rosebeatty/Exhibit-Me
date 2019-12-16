
    import React, { Component } from "react";
    import { Link } from "react-router-dom";
    import { withAuth } from "../lib/AuthProvider";
    import Comment from "../lib/comments-service";
    import axios from "axios";
    
    class addComment extends Component {
        constructor(props) {
            super(props)
        
        this.state = {
            input: "",
            initialComments: []
        }
    }
    handleInput = (e) => {
        const { value } = e.target;
        this.setState({ input: value });
      };


    handleSubmit = (e) => {
    e.preventDefault();

    const comment  = this.state.input;

    const userId = this.props.user._id;

    axios
      .post(`http://localhost:5000/comments/create/${userId}`, {
        comment, userId
      })
      .then(response => {
        console.log("Hello", response.data);
        const userData = response.data;
        this.props.getComments()
        this.setState({ initialComments: userData });
        // console.log(this.state.comments)
       
      })
      .catch (err => {
        console.log(err);
      });

    }

    render() {

        // const {comments} = this.state;
    
        return (
     <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleInput} type="text" name="comment" value={this.state.input} placeholder="Add a public comment..."></input>
            <button>COMMENT</button>
            <button >CANCEL</button>
          </form>
        )
    }
    }
    export default withAuth(addComment)