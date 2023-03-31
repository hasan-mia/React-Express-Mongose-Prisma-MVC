/* eslint-disable no-undef */
const Post = require("../models/Post");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
// Doamin
const domain = process.env.HOST_URL;

// ========Create a new status============
const statusPublish = async (req, res) => {
  const newStatus = new Post(req.body);
  try {
    const saveStatus = await newStatus.save();
    res.status(200).send({
      status: 200,
      success: true,
      message: "status publish successfully",
      data: saveStatus,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ========update status============
const statusUpdate = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId || req.body.isAdmin) {
      await post.updateOne({ $set: req.body });
      res.status(200).send({
        status: 200,
        success: true,
        message: "status update successfully",
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

// ========Create a video status============
const videoPublish = async (req, res) => {
  let videoLink = null;
  if (req.file) {
    const videoPath = req.file.path;
    const outputPath = `public/upload/videos`;
    const videoName = videoPath.split("_")[1].split(".")[0].replace(/\s+/g, "");
    const pathName = Date.now() + videoName;
    const outputDir = outputPath + "/" + pathName;
    const fileName = Date.now() + `${videoName}.m3u8`;
    const videoUrl =
      domain + "/" + "upload/videos" + "/" + pathName + "/" + fileName;
    // create hls folder
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    // ffmpeg commad for convert video
    const command = ffmpeg(videoPath)
      .videoCodec("libx264")
      .audioCodec("aac")
      .outputOptions([
        "-c:v libx264",
        "-preset slow",
        "-crf 28",
        "-c:a aac",
        "-b:a 128k",
        "-hls_segment_type fmp4",
        "-hls_time 10",
        "-hls_list_size 0",
      ])
      .output(path.join(outputDir, fileName))
      .on("end", () => {
        console.log("Conversion complete!");
        // remove orginal file
        fs.unlink(videoPath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Original file removed");
        });
      })
      .on("error", (err) => {
        console.error(err);
      });
    command.run();
    videoLink = videoUrl;
  }

  // Create video post object for mongodb
  const newVideo = new Post({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    video: {
      path: videoLink,
    },
    type: req.body.type,
  });
  try {
    const saveVideo = await newVideo.save();
    res.status(200).send({
      status: 200,
      success: true,
      message: "video publish successfully",
      data: saveVideo,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ========Create a video status============
const videoUpdate = async (req, res) => {
  if (req.file) {
    const videoPath = req.file.path;
    const outputPath = `public/upload/videos`;
    const videoName = videoPath.split("_")[1].split(".")[0].replace(/\s+/g, "");
    const pathName = Date.now() + videoName;
    const outputDir = outputPath + "/" + pathName;
    const fileName = Date.now() + `${videoName}.m3u8`;
    const videoUrl =
      domain + "/" + "upload/videos" + "/" + pathName + "/" + fileName;
    // create hls folder
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    // ffmpeg commad for convert video
    const command = ffmpeg(videoPath)
      .videoCodec("libx264")
      .audioCodec("aac")
      .outputOptions([
        "-c:v libx264",
        "-preset slow",
        "-crf 28",
        "-c:a aac",
        "-b:a 128k",
        "-hls_segment_type fmp4",
        "-hls_time 10",
        "-hls_list_size 0",
      ])
      .output(path.join(outputDir, fileName))
      .on("end", () => {
        console.log("Conversion complete!");
        // remove orginal file
        fs.unlink(videoPath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Original file removed");
        });
      })
      .on("error", (err) => {
        console.error(err);
      });
    command.run();
    videoLink = videoUrl;
  }

  // Create video post object for mongodb
  const newVideo = new Post({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    video: {
      path: videoLink,
    },
    type: req.body.type,
  });
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId || req.body.isAdmin) {
      await post.updateOne({ $set: updateVideo });
      res.status(200).send({
        status: 200,
        success: true,
        message: "video update successfully",
        data: post,
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

// ========Create a new status with image============
const imagesPublish = async (req, res) => {
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
  const imagesPost = new Post({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    images: imagesUrl,
    type: req.body.type,
  });
  try {
    const saveImages = await imagesPost.save();
    res.status(200).send({
      status: 200,
      success: true,
      message: "Images publish successfully",
      data: saveImages,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ========update a new status with image============
const imagesUpdate = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("Please upload at least one Image");
  }
  const imagesUrl = [];

  for (const file of req.files) {
    imagesUrl.push(
      domain + `/upload/images/${file.filename.replace(/\s+/g, "")}`
    );
  }

  // Create image post object for mongodb
  const imagesPost = new Post({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    images: imagesUrl,
    type: req.body.type,
  });
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId || req.body.isAdmin) {
      await post.updateOne({ $set: imagesPost });
      res.status(200).send({
        status: 200,
        success: true,
        message: "Images update successfully",
        data: post,
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

// ========delete post============
const postDelete = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId || req.body.isAdmin) {
      await post.deleteOne();
      res.status(200).send({
        status: 200,
        success: true,
        message: "post delete successfully",
      });
    } else {
      res
        .status(403)
        .send({ status: 403, success: false, message: "you can't delete" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ======== get signle post by id============
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).send({
        status: 200,
        success: true,
        message: "Post found successfully",
        data: post,
      });
    } else {
      res
        .status(404)
        .send({ status: 404, success: false, message: "Post not found" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ======== get timeline posts with freinds============
const getTimeLinePost = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    const result = userPosts.concat(...friendPosts);
    if (result) {
      res.status(200).send({
        status: 200,
        success: true,
        message: "Timeline posts found",
        data: result,
      });
    } else {
      res.status(404).send({
        status: 404,
        success: false,
        message: "No timeline post found",
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ======== get users all posts ============
const getUserAllPost = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).send({
      status: 200,
      success: true,
      message: "get all users posts",
      data: posts,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ========like / dislike a post============
const postlikeDislike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const likePost = post.likes.includes(req.body.userId);
    if (!likePost) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res
        .status(201)
        .send({ status: 201, success: true, message: "post has been liked" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).send({
        status: 200,
        success: true,
        message: "post has been disliked",
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ========comment in a post============
const postComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.commentId === req.body.commentId
    );
    const data = {
      commentId: (Math.random() * 100000000000000000).toString(),
      userId: req.body.userId,
      username: req.body.username,
      profilePicture: req.body.profilePicture,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      text: req.body.text,
      parentId: "",
    };
    if (!comment) {
      await post.updateOne({ $push: { comments: data } });
      res
        .status(201)
        .send({ status: 201, success: true, message: "comment success" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ======== update comment in a post============
const updateComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.commentId === req.body.commentId
    );
    const user = post.comments.find(
      (comment) => comment.userId === req.body.userId
    );
    const data = {
      commentId: req.body.commentId,
      userId: req.body.userId,
      username: req.body.username,
      profilePicture: req.body.profilePicture,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      text: req.body.text,
      parentId: "",
    };

    if (comment && user) {
      await post.updateOne({ $set: { comments: req.body } });
      res.status(200).send({
        status: 200,
        success: true,
        message: "comment update success",
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ======== delete comment in a post============
const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.commentId === req.body.commentId
    );
    const user = post.comments.find(
      (comment) => comment.userId === req.body.userId
    );
    if (comment && user) {
      await post.updateOne({ $pull: { comments: req.body.commentId } });
      res.status(200).send({
        status: 200,
        success: true,
        message: "comment deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ========Reply in a comment============
const postReply = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.commentId === req.body.commentId
    );
    const data = {
      commentId: (Math.random() * 100000000000000000).toString(),
      userId: req.body.userId,
      username: req.body.username,
      profilePicture: req.body.profilePicture,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      text: req.body.text,
      parentId: req.body.commentId,
    };
    if (!comment) {
      await post.updateOne({ $push: { comments: data } });
      res
        .status(201)
        .send({ status: 201, success: true, message: "comment success" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ======== update reply of a comment============
const updateReply = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const reply = post.comments.find(
      (comment) => comment.parentId === req.body.parentId
    );
    const data = {
      commentId: req.body.commentId,
      userId: req.body.userId,
      username: req.body.username,
      profilePicture: req.body.profilePicture,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      text: req.body.text,
      parentId: req.body.commentId,
    };
    if (reply) {
      await post.updateOne({ $set: { comments: data } });
      res.status(200).send({
        status: 200,
        success: true,
        message: "comment update success",
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ======== delete reply of a comment============
const deleteReply = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
     const reply = post.comments.find(
      (comment) => comment.parentId === req.body.parentId
    );
    if (reply) {
      await post.updateOne({ $pull: { comments: req.body.commentId } });
      res.status(200).send({
        status: 200,
        success: true,
        message: "comment deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ======== get all posts for admin ============
const getAllPost = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (user.isAdmin) {
      const posts = await Post.find({});
      res
        .status(200)
        .send({ status: 200, success: true, message: "All post", data: posts });
    } else {
      res
        .status(403)
        .send({ status: 403, success: false, message: "forbiden access" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  statusPublish,
  statusUpdate,
  videoPublish,
  videoUpdate,
  imagesPublish,
  imagesUpdate,
  postDelete,
  postlikeDislike,
  postComment,
  updateComment,
  deleteComment,
  postReply,
  updateReply,
  deleteReply,
  getPost,
  getTimeLinePost,
  getUserAllPost,
  getAllPost,
};
