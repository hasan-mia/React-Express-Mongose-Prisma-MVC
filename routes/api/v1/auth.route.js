const router = require("express").Router();
const AuthController = require("../../../controllers/AuthController");
const limiter = require("../../../middleware/limiter");

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


module.exports = router