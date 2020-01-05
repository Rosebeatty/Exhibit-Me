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
    console.log(this.props);
    console.log(this.state.comments);
  };

  getComments = () => {
    const id = this.props.user._id;

    axios
      .get(`${process.env.REACT_APP_API_URL}/comments/${id}`)
      .then(response => {
        //PROBLEM
        const userData = response;
        this.setState({ initialComments: userData.data.comments });
        console.log(userData);
        console.log(this.state.initialComments);
        this.findCommon();
      })
      .catch(err => {
        console.log(err);
      });
  };

  findCommon = () => {
    //    let  theComments  = this.state.theComments;
    let initialComments = this.state.initialComments;

    axios.get(`${process.env.REACT_APP_API_URL}/comments`).then(response => {
      let theComments = response.data;

      let matchingComments = theComments
        .filter(comment => initialComments.includes(comment._id))
        .map(comment => comment);

      this.setState({ comment: matchingComments, comments: theComments });

      console.log(matchingComments);
      console.log(theComments);
    });
  };

  deleteComment = id => {
    const comment = this.state.comment;
    const newList = this.state.initialComments;
    console.log(id);
    const commentId = id;
    console.log("Hello", comment);

    let newCommentsList = comment.filter(el => {
      return el._id !== id;
    });

    axios
      .delete(`${process.env.REACT_APP_API_URL}/comments/delete/${commentId}`)
      .then(response => {
        console.log("Hello", response);
        const user = response.data;
        console.log(user);
        //    if (finalCommentsList > 1) {
        this.setState({ comment: newCommentsList });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // updateComment = () => {
  //     const comment  = this.state.input;

  //     const userId = this.props.user._id;

  //     axios.patch(`http://localhost:5000/comments/update/${userId}`, {
  //         comment, userId
  //     })
  //     .then(response => {
  //         console.log("Hello", response.data);
  //         const user = response.data;
  //         this.setState({comments: user.comments})
  //     })
  //     .catch(err => {
  //         console.log(err);
  //       });

  //}

  render() {
    const { comment } = this.state;
    const commentsList = comment.reverse();

    return (
      <div>
        <div id="comments-wrapper">
          <h3>Comments</h3>
          <div className="comment">
            <AddComment getComments={this.getComments} />
            <div>
              {commentsList.map((user, index) => {
                return (
                  <div key={user._id} className="comment">
                    <h3>{user.comment} </h3>

                    <img
                      style={{
                        marginTop: "-1.5em",
                        marginBottom: "0.5em",
                        height: "5.0vh",
                        display: "block",
                        cursor: "pointer"
                      }}
                      src="trash.png"
                      id="delete-btn"
                      className="comments-btns"
                      onClick={e => this.deleteComment(user._id)}
                    />

                    <hr />

                    {/* <DeleteComment getComments={this.getComments}/> */}
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
