import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";
import AddComment from "./AddComment";

class Comments extends Component {
  state = {
    comments: [],
    input: "",
    commentId: [],
    initialComments: [],
    canDelete: true,
    comment: []
  };

  componentDidMount = () => {
    this.getComments();
  };

  getComments = async () => {
    const id = this.props.user._id;
    console.log(this.props);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/comments/${id}`)
      .then(response => {
        //PROBLEM
        const userData = response.data;
        this.setState({ initialComments: userData.comments });
      })
      .then(res => {
        this.findCommon();
      })
      .catch(err => {
        console.log(err);
      });
  };

  findCommon = () => {
    let initialComments = this.state.initialComments;

    axios.get(`${process.env.REACT_APP_API_URL}/comments`).then(response => {
      let theComments = response.data;

      let matchingComments = theComments
        .filter(comment => initialComments.includes(comment._id))
        .map(comment => comment)
        .reverse()

      this.setState({ comment: matchingComments, comments: theComments });

    });
  };

  deleteComment = id => {
    const comment = this.state.comment;
    const commentId = id;

    let newCommentsList = comment.filter(el => {
      return el._id !== id;
    });

    axios
      .delete(`${process.env.REACT_APP_API_URL}/comments/delete/${commentId}`)
      .then(response => {
        this.setState({ comment: newCommentsList });
      })
      .catch(err => {
        console.log(err);
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
    const { comment } = this.state;
    const commentsList = comment
    
    return (
      <div>
        <div id="comments-wrapper">
          <h3>{commentsList.length} Comments</h3>
          <div className="comment">
            <AddComment getPathname={this.props.user._id} getComments={this.getComments} />
            <div>
              {[...comment].map((user, i) => {
                return (
                  <div key={user._id} className="comment">
                    <h3>{user.comment}</h3>
                    <h6 style={{paddingTop:"0.5em"}}>{this.commentTimeFromNow(user.created_at)}</h6>
                    <img
                      style={{
                        marginTop: "-1.5em",
                        marginBottom: "0.5em",
                        height: "5.0vh",
                        display: "block",
                        cursor: "pointer"
                      }}
                      alt='delete'
                      src="trash.png"
                      id="delete-btn"
                      className="comments-btns"
                      onClick={e => this.deleteComment(user._id)}
                    />
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

export default withAuth(Comments);
