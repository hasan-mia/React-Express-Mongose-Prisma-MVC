const verifyJWT = require("../../../app/middleware/verifyJWT");
const ProductController = require("../../../app/controllers/ProductController");
const imagesUpload = require("../../../app/middleware/imagesUpload");
const limiter = require("../../../app/middleware/limiter");
const router = require("express").Router()

/**
  * @api {post} /published a product post
  * @apiDescription save product of user
  * @apiPermission anyone
 */
router.route("/").post(limiter, verifyJWT, imagesUpload, ProductController.productPublish)

/**
  * @api {put} /update product post
  * @apiDescription update product of user
  * @apiPermission anyone
 */  
router.route("/update/:id").put(limiter, verifyJWT, imagesUpload, ProductController.productUpdate)

/**
  * @api {put} /get product by slug
  * @apiDescription update product of user
  * @apiPermission anyone
 */  
router.route("/:slug").get(limiter, verifyJWT, ProductController.getProduct)

/**
 * @api {put} /get product by slug
 * @apiDescription update product of user
 * @apiPermission anyone
 */
// router.route("/vendor/:username").get(limiter, verifyJWT, ProductController.getProduct);

module.exports = router;