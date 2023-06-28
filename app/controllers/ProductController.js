/* eslint-disable no-undef */
const Post = require("../models/Post");
const User = require("../models/User");
// Doamin
const domain = process.env.HOST_URL;

// ========Create a new product============
const productPublish = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("Please upload at least one image");
  }
  const imagesUrl = [];

  for (const file of req.files) {
    imagesUrl.push(
      domain + `/upload/images/${file.filename.replace(/\s+/g, "")}`
    );
  }

  // Create image post object for mongodb
  const productPost = new Post({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discount: req.body.discount,
    stock: req.body.stock,
    quantity: req.body.quantity,
    color: req.body.color,
    size: req.body.size,
    type: req.body.type,
    images: imagesUrl,
  });
  try {
    const saveProduct = await productPost.save();
    res
      .status(200)
      .send({
        status: 200,
        success: true,
        message: "Product publish successfully",
        data: saveProduct,
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ========update product ============
const productUpdate = async (req, res) => {
  const imagesUrl = [];

  if(req.files){
    for (const file of req.files) {
    imagesUrl.push(
      domain + `/upload/images/${file.filename.replace(/\s+/g, "")}`
    );
    }
  }
  // Create image post object for mongodb
  const productUpdate = {
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discount: req.body.discount,
    stock: req.body.stock,
    quantity: req.body.quantity,
    color: req.body.color,
    size: req.body.size,
    type: req.body.type,
    images: imagesUrl,
  };
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId || req.body.isAdmin) {
      await post.updateOne({ $set: productUpdate });
      res
        .status(200)
        .send({
          status: 200,
          success: true,
          message: "Product update successfully",
          data: productUpdate,
        });
    } else {
      res
        .status(403)
        .send({ status: 403, success: false, message: "you can't update" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ========get single product ============
const getProduct = async (req, res)=>{
  try {
    const product = await Post.findOne({slug: req.params.slug})
    console.log(product)
    if (!product) {
      res.status(404).send({status: 404, success: false, message: 'Product not found'})
    }else{
      res.status(200).send({status: 200, success: true, message: 'Product found', data: product})
    }
  } catch (error) {
    res.status(500).send(error)
  }

}

// ========get single product ============
const getProductByVendor = async (req, res)=>{
  try {
    const user = await User.findOne({username: req.body.username})
    const product = await Post.findOne({slug: req.params.slug})
    
    if (!product) {
      res.status(404).send({status: 404, success: false, message: 'Product not found'})
    }else{
      res.status(200).send({status: 200, success: true, message: 'Product found', data: product})
    }
  } catch (error) {
    res.status(500).send(error)
  }

}

module.exports = { productPublish, productUpdate, getProduct};
