import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";
import AddComment from "./AddComment";

class UserComments extends Component {
  state = {
    user: [],
    comments: [],
    input: "",
    commentId: [],
    initialComments: [],
    userComments: [],
    theComments: [],
    userCom: [],
  };

  componentDidMount = () => {
    const id = this.props.getPathname;
    console.log(this.props);
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then((response) => {
        this.setState({ user: response, userComments: response.data });
      })
      .catch((err) => {
        console.log(err);
      });

    this.getComments();
  };

  getComments = async () => {
    const id = this.props.getPathname;

    await axios
      .get(`${process.env.REACT_APP_API_URL}/comments/${id}`)
      .then((response) => {
        this.setState({ userComments: response.data.comments });
        this.findCommon();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  findCommon = async () => {
    let userComments = this.state.userComments;

   await axios.get(`${process.env.REACT_APP_API_URL}/comments`).then((response) => {
      let theComments = response.data;

      let matchingComments = theComments
        .filter((comment) => userComments.includes(comment._id))
        .map((comment) => comment)
        .reverse();

      this.setState({ userCom: matchingComments });
    });
  };

  commentTimeFromNow = (date1) => {
    let currentTime = new Date()
    let months = Math.round(Math.abs(currentTime - new Date (date1)) / (2e3 * 3600 * 365.25));
    let days = Math.round((currentTime - new Date (date1) ) / (1000*60*60*24));
    let hours = Math.round((Math.abs(currentTime - new Date (date1) )) / (1000 * 60 * 60));
    let minutes = Math.round((Math.abs(currentTime - new Date (date1) )) / (1000 * 60));

    return months === 1 ? months + ' month ago' : months > 1 ? months + ' months ago' : days === 1 ? days + ' day ago' : days > 1 ? days + ' days ago' : hours === 1 ? hours + ' hour ago' : hours > 1 ? hours + ' hours ago' : minutes === 1 ? minutes + 'minute ago' : minutes > 1 ? minutes + ' minutes ago' : minutes < 1 ? '1 minute ago' : '1 minute ago';
  } 

  render() {
    const commentsList = this.state.userCom;

    return (
      <div>
        <div id="comments-wrapper">
          <h3>{commentsList.length} Comments</h3>
          <div className="comment">
            <AddComment
              getPathname={this.props.getPathname.slice(1)}
              getComments={this.getComments}
            />
            <div>
              {commentsList.map((user, index) => {
                return (
                  <div key={user._id} className="comment">
                    <h3>{user.comment}</h3>
                    <h6 style={{paddingTop:"0.5em"}}>{this.commentTimeFromNow(user.created_at)}</h6>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(UserComments);
