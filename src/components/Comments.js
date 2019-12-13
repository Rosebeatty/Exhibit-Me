import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";

class Comments extends Component {
    state= {
        comments: [],
        comment:"",
        input: ""
    }
  

    handleInput = e => {
        const { value } = e.target;
        this.setState({ input: value });
      };


    handleSubmit = (e) => {
    e.preventDefault();

    const  comment  = this.state.input;

    const userId = this.props.user._id;

    axios
      .post(`http://localhost:5000/comments/create/${userId}`, {
        comment, userId
      })
      .then(response => {
        console.log("Hello", response.data);
        const user = response.data;
        this.setState({ comments: user.comment });
      })
      .catch(err => {
        console.log(err);
      });


    }

    componentDidMount() {
        console.log(this.props);
        const id = this.props.user._id;
        axios
          .get(`http://localhost:5000/users/${id}`)
          .then(response => {
            console.log("Hello", response.data);
            const user = response.data;
            this.setState({
              comments: user.comments
             
            });
            console.log(this.state.comments)
          })
          .catch(err => {
            console.log(err);
          });
      }

  
    render() {
    return (
      <div id="comments-wrapper">
        <h3>400 Comments</h3>
        <div className="comment">
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleInput} type="text" name="comment" value={this.state.input} placeholder="Add a public comment..."></input>
            <button>COMMENT</button>
            <button>CANCEL</button>
          </form>
            <div>{this.state.comments}</div>

          {/* <div id="user-name">
          {this.state.comments.map(user => {
            return (
              <div key={user._id} className="one-user">
                <Link to={`/${user._id}`}>
                  <h3>{user.comment}</h3>
                </Link>
              </div>
            );
          })}
        </div> */}

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
