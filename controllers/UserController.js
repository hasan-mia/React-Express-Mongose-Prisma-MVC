/* eslint-disable no-unused-vars */
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const User = require("../models/User");

// ========Get a User============
const singleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).send({
        status: 200,
        success: true,
        message: `User found successfully`,
        data: user,
      });
    } else {
      res.status(404).send({
        status: 404,
        success: false,
        message: `user not found`,
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ========Get all User for admin============
const allleUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (user.isAdmin) {
      const users = await User.find({});
      // const {password, updatedAt, ...others} = users
      res.status(200).send({
        status: 200,
        success: true,
        message: `user found successfully`,
        data: users,
      });
    } else {
      return res
        .status(403)
        .send({ success: false, message: "forbiden access", data: null });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// ========Update User===========
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).send(error);
      }
    }
    try {
      const checkUsername = await User.findOne({ username: req.body.username });
      const checkEmail = await User.findOne({ email: req.body.email });
      if (checkUsername) {
        res.status(409).send({
          status: 409,
          success: false,
          error: "username already taken",
        });
      } else if (checkEmail) {
        res
          .status(406)
          .send({ status: 406, success: false, error: "email already used" });
      } else {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).send({
          status: 200,
          success: true,
          message: "account has been updated",
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res.status(403).send({
      status: 403,
      success: false,
      message: "you can update only your id",
    });
  }
};
// ========Delete User===========
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      // delete user posts
      await Post.deleteMany({ userId: req.body.userId });
      //delete user
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send({
        status: 200,
        success: true,
        message: "account has been deleted successfully",
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res.status(403).send({
      status: 403,
      success: false,
      message: "you can delete only your accout",
    });
  }
};

// ========Follow User===========
const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      const follower = user.followers.includes(req.body.userId);
      if (!follower) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).send({
          status: 200,
          success: true,
          message: "user has been followed",
        });
      } else {
        res.status(406).send({
          status: 406,
          success: false,
          message: "you already followed",
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res.status(403).send({
      status: 403,
      success: false,
      message: "you can't follow yourself",
    });
  }
};
// ========unfollow User=========
const unFollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      const follower = user.followers.includes(req.body.userId);
      if (follower) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).send({
          status: 200,
          success: true,
          message: "user has been unfollowed",
        });
      } else {
        res.status(406).send({
          status: 406,
          success: false,
          message: "you already unfollowed",
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res.status(403).send({
      status: 403,
      success: false,
      message: "you can't unfollow yourself",
    });
  }
};

// ========Get friends ============
const friends = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).send({
      status: 200,
      success: true,
      message: `friens found successfully`,
      data: friendList,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  singleUser,
  allleUser,
  followUser,
  unFollowUser,
  friends,
};
