import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import Comment from "../lib/comments-service";
import axios from "axios";
import AddComment from "./AddComment";


class Comments extends Component {
  state = {
    comments: [],
    input: "",
    commentId: [],
    initialComments: []
  };

  componentDidMount = () => {
    // console.log(this.props);

    this.getComments();
    console.log(this.props.userInfo);
    console.log(this.state.comments);
  };

  getComments = () => {
    const id = this.props.user._id;

    axios
      .get(`http://localhost:5000/comments`)
      .then(response => {
        //PROBLEM
        const userData = response;
        this.setState({ initialComments: userData.data });
        console.log(userData.data);
        console.log(this.state.initialComments);
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteComment = (id) => {
   
    // const newList = this.state.initialComments;
    console.log(id)
    const commentId = id
    console.log(commentId)

    const newList = this.state.initialComments;
    let newCommentsList = newList.filter(user => user._id !== commentId);
   this.setState({initialComments: newCommentsList})

  axios.delete(`http://localhost:5000/comments/delete/${commentId}`)
  .then(response => {
    
      console.log("Hello", response);
      const user = response.data;
      console.log(user)
    //   this.setState({initalComments: user.comments})
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
    // const {comments} = this.state;
    const commentsList = this.state.initialComments.reverse();

    return (
      <div id="comments-wrapper">
        <h3>400 Comments</h3>
        <div className="comment">
          <AddComment getComments={this.getComments} />
          <div>
            {commentsList.map((user, index) => {
              return (
                <div key={user._id} className="comment">
                  <h3>{user.comment}</h3>
                  <hr />
                
                  <button onClick={(e) => this.deleteComment(user._id)}>Delete Button</button>
                  <hr />

                  {/* <DeleteComment getComments={this.getComments}/> */}

                  {/* <button onClick={this.deleteComment}>Delete Button</button>
                <hr /> */}
                </div>
              );
            })}
          </div>

          <p>Rose 1 week ago</p>
          <p>
            HelloThereHelloThereHelloThereHelloThereHelloThereHelloThereHelloThereHelloThereHelloThere
          </p>
          <p>Reply</p>
          <hr />
        </div>
      </div>
    );
  }
}

export default withAuth(Comments);
