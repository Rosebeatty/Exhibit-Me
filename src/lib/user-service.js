import axios from 'axios';

class Users {
  constructor() {
    this.users = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  getAll() {
    return this.users
              .get(`/users`)
              .then(({ data }) => data);
  }

  getOneById(id) {
    return this.users
              .get(`/${id}`)
              .then(({ data }) => data);
  }
}




// commentssService.getAll()
//   .then( (response) => response.data )
//   .catch( (err) => console.log(err));

// commentssService.getOneById( idString )
//   .then( ( { data } ) => data)
//   .catch( (err) => console.log(err));


const users = new Users();

export default Users;
