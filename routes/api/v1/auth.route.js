const router = require("express").Router();
const AuthController = require("../../../controllers/AuthController");
const limiter = require("../../../middleware/limiter");
const verifyJWT = require("../../../middleware/verifyJWT");

/**
  * @api {post} /users save a user
  * @apiDescription save data as a new user
  * @apiPermission anyone
 */
router.route("/register").post(limiter, AuthController.registerUser)

 /**
   * @api {post} /login a user
   * @apiDescription generate login credentials
   * @apiPermission anyone
  */ 
 router.route("/login").post(limiter, AuthController.loginUser)

 /**
   * @api {get} /get a user
   * @apiDescription get single user credentials
   * @apiPermission anyone
  */ 
 router.route("/user/:id").get(limiter, verifyJWT, AuthController.singleUser)


module.exports = router