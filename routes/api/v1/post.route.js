const verifyJWT = require("../../../middleware/verifyJWT");
const PostStatusController = require("../../../controllers/PostStatusController");
const imagesUpload = require("../../../middleware/imagesUpload");
const limiter = require("../../../middleware/limiter");
const videoUpload = require("../../../middleware/videoUpload");
const router = require("express").Router();

/**
 * @api {post} /published a status
 * @apiDescription save status of user
 * @apiPermission anyone
 */
router
  .route("/status")
  .post(limiter, verifyJWT, PostStatusController.statusPublish);

/**
 * @api {put} /update status
 * @apiDescription update status of user
 * @apiPermission anyone
 */
router
  .route("/status/update/:id")
  .put(limiter, verifyJWT, PostStatusController.statusUpdate);

/**
 * @api {post} /published a video status
 * @apiDescription save status of user
 * @apiPermission anyone
 */
router
  .route("/video")
  .post(limiter, verifyJWT, videoUpload, PostStatusController.videoPublish);

/**
 * @api {put} /update video status
 * @apiDescription update status of user
 * @apiPermission anyone
 */
router
  .route("/video/update/:id")
  .put(limiter, verifyJWT, videoUpload, PostStatusController.videoUpdate);
/**
 * @api {post} /published a images status
 * @apiDescription save status of user
 * @apiPermission anyone
 */
router
  .route("/images")
  .post(limiter, verifyJWT, imagesUpload, PostStatusController.imagesPublish);

/**
 * @api {put} /update images status
 * @apiDescription update status of user
 * @apiPermission anyone
 */
router
  .route("/images/update/:id")
  .put(limiter, verifyJWT, imagesUpload, PostStatusController.imagesUpdate);

/**
 * @api {delete} /delete a post
 * @apiDescription delete post of user
 * @apiPermission anyone
 */
router
  .route("/delete/:id")
  .delete(limiter, verifyJWT, PostStatusController.postDelete);

/**
 * @api {get} /get single post
 * @apiDescription single post of user
 * @apiPermission anyone
 */
router.route("/:id").get(limiter, verifyJWT, PostStatusController.getPost);

/**
 * @api {get} /get timeline post from freinds
 * @apiDescription timeline post of user
 * @apiPermission anyone
 */
router
  .route("/timeline/:userId")
  .get(limiter, verifyJWT, PostStatusController.getTimeLinePost);

/**
 * @api {get} /get all post from user
 * @apiDescription all post of user
 * @apiPermission anyone
 */
router
  .route("/profile/:username")
  .get(limiter, verifyJWT, PostStatusController.getUserAllPost);

/**
 * @api {put} /Like / dislike a post
 * @apiDescription like / dislike post of user
 * @apiPermission anyone
 */
router
  .route("/likes/:id")
  .put(limiter, verifyJWT, PostStatusController.postlikeDislike);

/**
 * @api {put} / post comment a post
 * @apiDescription comment on a post of user
 * @apiPermission anyone
 */
router
  .route("/comment/:id")
  .put(limiter, verifyJWT, PostStatusController.postComment);

/**
 * @api {put} / update comment a post
 * @apiDescription update comment on a post of user
 * @apiPermission anyone
 */
router
  .route("/comment/update/:id")
  .put(limiter, verifyJWT, PostStatusController.updateComment);

/**
 * @api {delete} / delete comment a post
 * @apiDescription delete comment on a post of user
 * @apiPermission anyone
 */
router
  .route("/comment/delete/:id")
  .put(limiter, verifyJWT, PostStatusController.deleteComment);

/**
 * @api {put} / post reply of a a comment
 * @apiDescription comment on a post of user
 * @apiPermission anyone
 */
router
  .route("/reply/:id")
  .put(limiter, verifyJWT, PostStatusController.postReply);

/**
 * @api {put} / update reply
 * @apiDescription update comment on a post of user
 * @apiPermission anyone
 */
router
  .route("/reply/update/:id")
  .put(limiter, verifyJWT, PostStatusController.updateReply);

/**
 * @api {delete} / delete reply a post
 * @apiDescription delete reply on a post of user
 * @apiPermission anyone
 */
router
  .route("/reply/delete/:id")
  .put(limiter, verifyJWT, PostStatusController.deleteReply);

/**
 * @api {get} /get all post for admin
 * @apiDescription all post of user
 * @apiPermission anyone
 */
router.route("/").get(limiter, verifyJWT, PostStatusController.getAllPost);

module.exports = router;
