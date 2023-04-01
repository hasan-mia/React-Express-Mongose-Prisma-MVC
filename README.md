## REMVC -MVC Pattern with REACT, EXPRESS and MONGOSE
REMVC is a react express mongose MVC Pattern Project. Where you can start your project with just one command.This is the opensource project.So, fork & give star the project. you can also contribute this project for better perfomance and more easier to develpoed a MERN project.

### Folder Stracture
<code>
__index.js (server index file)
__config
______connection.js (mongoose connection  method)
__controllers ( write your all rest api controller here)
______AuthController.js (user register, login and get userinfo api)
______UserController.js (get, update, delete, follow, unfollow and all userInfo for userControll)
______PostStatusController.js (publish, update, delete, get post as text post, image and video api)
______ProductController.js (publish, update, delete, get post as product post with multiple image)
__middleware ( write your all rest api middleware here)
______imageUpload (middleware for image upload)
______videoUpload (middleware for image upload)
______verifyJWT (middleware for login authentication)
______limiter
__models ( write your database model here)
_____Post.js (all post with type base database model)
_____User.js (user database model)
_____Message.js (live chat database model for socketIO)
__public (all common css/js or media file upload here)
______index.html
______404.html
__routes (write all indivisual route in this folder all api are secure with jsonwebtoken)
________api
__________v1
____________auth.route.js
__views (manage your client site from here)
______public
______src
_________app.js
_________index.js
_________index.css
_________auth (basic login and registratioin form)
_________backend (admin dashboard)
_________frontend (frontend site)
_________layout (frontend and admin layout)
_________routes (frontend and admin routes)
_________store (redux state management)
____________api (setup rest api link and fetching data to getting response)
_______________config.jsx (basic header and client env settings)
_______________url.jsx (all api routes/ link)
_______________auth.jsx (fetch auth routes)
____________Slice (all slice will write here for dispatch data)
_______________AuthSlice.jsx (authentication slice)
_______________CartSlice.jsx (full local storage base Cart)
____________Store (all fetching data will store here)
__.env.example (rename this to .env and update your credentials both server and client site)
</code>

#### Uses tools for server / rest api
##### bcrypt
##### express
##### express-rate-limit
##### helmet
##### jsonwebtoken
##### multer
##### fluent-ffmpeg
##### mongoose
##### morgan
##### nodemon
##### helmet
##### require-stack

### Uses tools for cient/frontend
##### react / NextJs
##### react router dom
##### redux
##### splidejs
##### rsuitjs / Metarial ui
##### tailwind

### ENV Setup and Change value
#### To run this project follow these steps
I. Copy .env.example and rename .env
II. Change the dbname and password or full DATABASE_URL

NODE_ENV=development
HOST_URL=http://localhost:5000
DATABASE_URL=mongodb+srv://dbname:password@cluster0.ngw4z7m.mongodb.net/?retryWrites=true&w=majority
ACCESS_TOKEN_SECRET=YmAb0fJLyOVdX5jWZDWGZ6+2r/feExwbbLmd7EUnpV/CBKbupVApVCw=

### Generate secret totken
openssl rand -base64 128

### Install Dependencies
yarn 
or
npm install

### Serve with at http://localhost:5000
yarn server
or
npm run server

### Client with at http://localhost:3000
cd views (To go views directory and run)

yarn start
or
npm start

### build for production with minification
yarn build
or
npm run build

### ALL API ROUTE 

#### [Note: authorization in headers must need to test api]

#### Authentication 
##### i. http://localhost:5000/api/v1/auth/register (Register) [method: post] 
##### ii. http://localhost:5000/api/v1/auth/login (Login) [method: post] 

#### User 
##### i. http://localhost:5000/api/v1/user/update/[userId] (update userInfo by userId params) [method: put]
##### ii. http://localhost:5000/api/v1/user/[userId] (get single user by userId params) [method: get]
##### iii. http://localhost:5000/api/v1/user/delete/[userId] (Delete user by userId params) [method: delete]
##### iv. http://localhost:5000/api/v1/user/all (get all users only for super admin) [method: get]
##### v. http://localhost:5000/api/v1/user/follow/[follwerId] (follow another by hist userId params and owner userId in body. Example <code>{ "userId": "642673f01bfc9efbc1e4ec53"} </code>) [method: put]
##### vi. http://localhost:5000/api/v1/user/unfollow/[unfollwerId] (unfollow another by his userId params and owner userId in body. Example <code>{ "userId": "642673f01bfc9efbc1e4ec53"} </code>) [method: put]
##### v. http://localhost:5000/api/v1/user/friends/[userId] (get a single user followerlist by userId params) [method: get]

#### Product 
##### i. http://localhost:5000/api/v1/product (publish product where post type is 3) [method: post]
##### ii. http://localhost:5000/api/v1/product/update/[Id] (update product) [method: put]
##### iii. http://localhost:5000/api/v1/product/delete/[Id] (Delete product) [method: delete]
##### iv. http://localhost:5000/api/v1/product/[slug] (get single product by slug) [method: get]
##### v. http://localhost:5000/api/v1/product/vendor/[username] (get vendor product by username)

#### Post 
##### i. http://localhost:5000/api/v1/post/status (publish status post type is 0) [method: post]
##### ii. http://localhost:5000/api/v1/post/status/update/[Id] (update status) [method: put]
##### iii. http://localhost:5000/api/v1/post/images (publish status with images) [method: post]
##### iv. http://localhost:5000/api/v1/post/image/update (update image status post) [method: put]
##### v. http://localhost:5000/api/v1/post/video/ (publish video post) [method: post]
##### vi. http://localhost:5000/api/v1/post/video/update (update video post) [method: put]
##### vii. http://localhost:5000/api/v1/post/[Id] (get single post) [method: get]
##### viii. http://localhost:5000/api/v1/post/delete/[Id] (get single post) [method: get]
##### ix. http://localhost:5000/api/v1/post/timeline/[userId] (get all post by super admin) [method: get]
##### ix. http://localhost:5000/api/v1/post (get timeline post of a user base on friends) [method: get]
##### x. http://localhost:5000/api/v1/post/likes/[Id] (likes and dislike on a post where post Id is a params and owner userId in body. Example <code>{ "userId": "642673f01bfc9efbc1e4ec53"} </code>) [method: put]
##### xi. http://localhost:5000/api/v1/post/comment/[Id] (comment on a post where post Id is a params and owner userId in body where parentId is empty. Example <code>{ "userId": "642673f01bfc9efbc1e4ec53",  "text": "text of commnet", "parentId": ""} </code>) [method: put]
##### xii. http://localhost:5000/api/v1/post/reply/[Id] (reply on a post where post Id is a params and owner userId where parentId of comment in body. Example <code>{ "userId": "642673f01bfc9efbc1e4ec53",  "text": "text of commnet",  "parentId": "commentId"} </code>) [method: put]

### Authentication Example

#### Register a new User 
##### http://localhost:5000/api/v1/auth/register
<code>
Method: POST
Body: 
{
  "username": "example",
  "email": "example@example.com",
  "password": "123456"
}
Response: 
{
  "success": true,
  "message": "Register successfully",
  "user": {
    "username": "example",
    "email": "example@example.com",
    "password": "$2b$10$gWTnSx344U0OHNekYWte8sGYeet7vUAvQMzf9MYaYGJGJmXKIITbdAD.",
    "profilePicture": "",
    "coverPicture": "",
    "followers": [],
    "followings": [],
    "isAdmin": false,
    "_id": "63dd4c8e69db19249b457fa535",
    "createdAt": "2023-02-03T18:03:58.918Z",
    "updatedAt": "2023-02-03T18:03:58.918Z",
    "__v": 0
  }
}
</code>

### Login User 
#### http://localhost:5000/api/v1/auth/login
<code>
Method: POST
Body: 
{
  "username": "example",
  "password": "123456"
}
or
{
  "email": "example@example.com",
  "password": "123456"
}

Response: 
{
  "success": true,
  "message": "login success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2RkMzlhYzFiNjQ3NjYxZWNmYTIyNWEiLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NzU1MDU1NTR9.FlGkO2Hk2NEQJdO9sa1FyHSS07z0dgTbIT8s7kXwBCQ"
}
</code>

### Userinfo by id
#### http://localhost:5000/api/v1/auth/user/63dd39ac1b647661ecfa225a
<code>
Method: GET
body:
{
  "userId": "63dd39ac1b647661ecfa225a"
}

Response:
{
  "success": true,
  "message": "user found successfully",
  "data": {
    "_id": "63dd39ac1b647661ecfa225a",
    "username": "example",
    "email": "example@example.com",
    "profilePicture": "",
    "coverPicture": "",
    "followers": [],
    "followings": [],
    "isAdmin": false,
    "createdAt": "2023-02-03T16:43:24.460Z",
    "__v": 0
  }
}
</code>
