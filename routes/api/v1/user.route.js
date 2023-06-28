const router = require("express").Router();
const verifyJWT = require("../../../app/middleware/verifyJWT");
const UserController = require("../../../app/controllers/UserController");
const limiter = require("../../../app/middleware/limiter");

/**
  * @api {get} get all user for admin
  * @apiDescription Get all user
  * @apiPermission admin
*/ 
router.route("/all").get(limiter, verifyJWT, UserController.allleUser)

/**
  * @api {get} get a single user
  * @apiDescription Get a single user
  * @apiPermission admin
*/ 
router.route("/:id").get(limiter, verifyJWT, UserController.singleUser)

/**
  * @api {put} /update a user
  * @apiDescription Get all the users
  * @apiPermission admin
*/ 
 router.route("/update/:id").put(limiter, verifyJWT, UserController.updateUser)

/**
   * @api {delete} delete a user
   * @apiDescription Get all the users
   * @apiPermission admin
*/ 
 router.route("/delete/:id").delete(limiter, verifyJWT, UserController.deleteUser)

/**
  * @api {put} follow a user
  * @apiDescription Get followers list
  * @apiPermission admin
*/ 
router.route("/follow/:id").put(limiter, verifyJWT, UserController.followUser)

/**
  * @api {put} unfollow a user
  * @apiDescription Get unfollower list
  * @apiPermission admin
*/ 
router.route("/unfollow/:id").put(limiter, verifyJWT, UserController.unFollowUser)

/**
  * @api {get} friend list of a user
  * @apiDescription Get friends list
  * @apiPermission admin
*/ 
router.route("/friends/:id").get(limiter, verifyJWT, UserController.friends)

module.exports = router