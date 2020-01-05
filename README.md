# Exhibit Me

<br>

## Description

A social network created with React, A-Frame, MongoDB and NodeJs for artists and innovators to share their 3d objects in virtual environments.



## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault

- **Signup:** As an anon I can sign up in the platform so that I can start playing into competition

- **Login:** As a user I can login to the platform so that I can play competitions

- **Logout:** As a user I can logout from the platform so no one else can use it

- **See my profile:** As a user I can view my profile

- **Edit profile:** As a user I can edit my profile

- **Add 3D object to my environment:** As a user I can upload a 3D object (.glb format) to the virtual environment

-  **View other user profiles:** As a user I can view the profiles of other users

- **Create/update/delete comments:** As a user I can make/delete/update comments

- **Search users and themes:** As a user I can use the search bar to search users and themes by hashtag

  




## Backlog

- Admin panel to monitor hashtag/theme popularity
- Add environment background-image
- Add environment sound/song
- Query Model to save searches
- Upload profile image 

<br>




# Client / Frontend

## Routes (React App)
| Path                      | Component            | Permissions | Behavior                                                     |
| ------------------------- | -------------------- | ----------- | ------------------------------------------------------------ |
| `/auth/home`     | HomePage        | user only | Check if user logged in a return home page     |
| `/auth/signup`            | SignupPage           | anon only   | Signup form, link to login, navigate to homepage after signup |
| `/auth/login`             | LoginPage            | anon only   | Login form, link to signup, navigate to homepage after login |
| `/auth/logout`            | n/a                  | anon only   | Navigate to homepage after logout, expire session            |
| `/profile`      | ProfilePage | user only   | Shows personal profile |
| `/:user-id`   | UserPage | user only   | Gets specified user profile |


## Components

- LoginPage
- HomePage
- SignupPage
- ProfilePage
- UserPage
- Navbar
- VRScene
- UserVRScene
- PostComment
- UserComments
- SearchBar
- Comments




## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
  

<br>


# Server / Backend


## Models

Users model

```javascript
{
 {
  username: String,
  email: String,
  password: String,
  space_name: String,
  theme: String,
  objects: [ {type: Schema.Types.ObjectId, ref:'Model'} ],
  comments: [{type: Schema.Types.ObjectId, ref:'Comment'}],
 }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  } 
 }
}
```



Object model

```javascript
{ 
 {
  path: String,
  user_id: [{type: Schema.Types.ObjectId, ref: 'User'}]
 }, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
 }
}
```



Comment model

```javascript
 {
  comment: String,
  userId: [{type: Schema.Types.ObjectId, ref: 'User'}]

}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
   }
 }
```

<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/home    `       | Saved session                | 200            | 404          | Check if user is logged in and returns home page     |
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if field is not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs the user out                                        |
| GET         | `/users`             |                              |                | 400          | Gets all users                                 |
| POST      | `/users/upload/:id`  |                          |                |         | Uploads .glb file on server and saves to profile           |
| DELETE   | `/users/deleteObject/:id` | {id}              | 201            | 400          | Deletes user's object from environment |
| GET    | `/users/:id` | {id}                         | 201            | 400          | Gets user info                  |
| PUT       | `/users/update/:id`     | {id} |                | 400          | Updates user info                        |
| DELETE   | `/users/delete/:id`      | {id}                         |                |              | Deletes user                        | | GET   | `/users/filename/`      | {id}                         |     |              | Gets filename of the last object saved in database  |
| GET   | `/users/filename/:id`      | {id}                          | |              | Gets filename of object from user profile           |
| POST        | `/comments` | {id}     | 200            | 404          | Find All Comments                  |
| POST        | `/comments/:id` | {id}     | 200            | 404                   | Find All Comments Connected to User  |
| POST        | `/comments/create/:id` | {id}     | 200            | 404          | Adds comment to specified user                  |
| PUT         | `/comments/update/:id` | {id}                  | 201            | 400          | Edits specified comment                    |
| DELETE      | `/comments/delete/:id` | {id}                         | 200            | 400          | Deletes specified comment          |

<br>


## Links

### Trello/Kanban

[Link to my trello board](https://trello.com/b/m0xBhHN9/exhibit-me) 


### Git


[Client repository Link](https://github.com/Rosebeatty/Exhibit-Me)

[Server repository Link](https://github.com/Rosebeatty/Exhibit-Me-api)

[Deployed Exhibit Me App](http://exhibitme-herokuapp.com)








