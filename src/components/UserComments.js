import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import Comment from "../lib/comments-service";
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
    userCom: []
  };

  componentDidMount = () => {
    // console.log(this.props);

    const id = this.props.getPathname;
   
    console.log(this.props)

    axios
      .get(`${process.env.REACT_APP_API_URL}/users${id}`)
      .then(response => {
        //PROBLEM
    
        this.setState({ user: response });
        console.log(response);
    
         
          // if (comment._id === user.comment) {
          //     return user.comment
          // }
  
          this.setState({userComments: response.data})
       
        })
        .catch(err => {
            console.log(err);
          });
           


    this.getComments();
    
    console.log(this.props);
    console.log(this.props.getPathname);

    // console.log(this.props.user._id)
    // console.log(this.props.match.params)
  };

  getComments = () => {

    const id = this.props.getPathname;
    const { user } = this.state


    console.log(this.props)

    axios
    .get(`${process.env.REACT_APP_API_URL}/comments${id}`)
    .then(response => {
      //PROBLEM

      
      this.setState({ userComments: response.data.comments });
      console.log(response);
    
      this.findCommon()

      })
      .catch(err => {
          console.log(err);
        });
        
  }


  findCommon = () => {

//    let  theComments  = this.state.theComments;
    let  userComments  = this.state.userComments

    axios
    .get(`${process.env.REACT_APP_API_URL}/comments`)
    .then(response => {

        console.log(response)
    
    let theComments = response.data

    let matchingComments = theComments.filter(comment => userComments.includes(comment._id)).map(comment => comment)
     
    this.setState({userCom: matchingComments})

    })
  }
   
  
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
    const commentsList = this.state.userCom.reverse() 

    return (
        <div>
      <div id="comments-wrapper">
        <h3>Comments</h3>
        <div className="comment">
          <AddComment getPathname={this.props.getPathname} getComments={this.getComments} />
          <div>
            {
                             
                  commentsList.map((comment, index) => {
                  return (
                    <div key={comment._id} className="comment">
                      <h3>{comment.comment}</h3>
                      <hr />
                   
                </div>
              );
            })
          }
            
          </div>
         
        </div>
      </div>
      </div>
    );
  }
}

export default withAuth(UserComments);
