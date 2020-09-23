import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";

class addComment extends Component {
    state = {
      input: "",
    };
  
  handleInput = e => {
    const { value } = e.target;
    this.setState({ input: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const userId = this.props.getPathname;
    const comment = this.state.input;

    axios
      .post(`${process.env.REACT_APP_API_URL}/comments/create/${userId}`, {
        comment,
        userId
      })
      .then(res => {
        this.props.getComments()
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.props.getComments();
  }

  cancelComment = e => {
    e.preventDefault();
    this.setState({ input: "" });
    return false;
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="create-comment" className="hidden"></label>
        <input
          id="create-comment"
          onChange={this.handleInput}
          type="text"
          value={this.state.input}
          placeholder="Add a public comment..."
        ></input>
        <button className="comments-btns" onClick={this.cancelComment}>
          CANCEL
        </button>
        <button className="comments-btns">COMMENT</button>
      </form>
    );
  }
}
export default withAuth(addComment);
