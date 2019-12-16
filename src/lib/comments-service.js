import axios from 'axios';

class Comments {
  constructor() {
    this.comments = axios.create({
      baseURL: 'http://localhost:5000/',
      withCredentials: true,
    });
  }

  // getAll(id) {
  //   return this.comments
  //             .get(`/comments/${id}`)
  //             .then(({ data }) => data);
  // }

  // createComment(userId) {
  //   return this.comments
  //             .get(`comments/create/${userId}`)
  //             .then(({ data }) => data);
  // }


  // deleteComment(userId) {
  //   return this.comments
  //             .get(`comments/delete/${userId}`)
  //             .then(({ data }) => data);
  // }

  // updateComment(userId) {
  //   return this.comments
  //             .get(`comments/update/${userId}`)
  //             .then(({ data }) => data);
  // }
  
}

// commentssService.getAll()
//   .then( (response) => response.data )
//   .catch( (err) => console.log(err));

// commentssService.getOneById( idString )
//   .then( ( { data } ) => data)
//   .catch( (err) => console.log(err));


const Comment = new Comments();

export default Comment;
