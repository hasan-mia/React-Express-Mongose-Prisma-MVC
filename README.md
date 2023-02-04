## REMVC -MVC Pattern with REACT, EXPRESS and MONGOSE
REMVC is a react express mongose MVC Pattern Project. Where you can start your project with just one command.This is the opensource project.So, fork & give star the project. you can also contribute this project for better perfomance and more easier to develpoed a mern project.

### Folder Stracture
<code>
__index.js (server index file)
__config
______connection.js (mongoose connection  method)
__controllers ( write your all rest api controller here)
______AuthController.js (user register, login and get userinfo api)
__middleware ( write your all rest api middleware here)
______verifyJWT (middleware for login authentication)
______limiter
__models ( write your database model here)
_____User.js (user database model)
__public (all common css/js or media file upload here)
______index.html
______404.html
__routes (write all indivisual route in this folder)
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
##### mongoose
##### morgan
##### nodemon
##### helmet
##### require-stack

### Uses tools for cient/frontend
##### react
##### react router dom
##### splidejs
##### rsuitjs
##### tailwind

### ENV Setup and change value
NODE_ENV=development / production
DATABASE_URL=mongodb+srv://database:password@cluster0.ngw4z7m.mongodb.net/?retryWrites=true&w=majority
ACCESS_TOKEN_SECRET=YmAb0fJLyOVdX5jWL4rRJc3Cb/J8QRYaTGC4C/yR34b7lTEQDmlZKVJEO1gnHbV==

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

### Authentication API reference

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
