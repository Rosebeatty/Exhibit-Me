
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import axios from 'axios'

 
 class Comments extends Component {


    render() {
        return (
 <div id="comments-wrapper">
 <h3>400 Comments</h3>
 <div className="comment">
    <form>
        <input type="text" placeholder="Add a public comment..."></input>
        <button>COMMENT</button>
        <button>CANCEL</button>
    </form>

     <p>Rose 1 week ago</p>
     <p>HelloThereHelloThereHelloThereHelloThereHelloThereHelloThereHelloThereHelloThereHelloThere</p>
     <p>Reply</p>
     <hr/>
 </div>
</div>
        )
    }
 }

 export default withAuth(Comments)