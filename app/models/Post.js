const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
// type is refered 0 means normal post, 1 means image post, 2 means video post and 3 means product post
mongoose.plugin(slug);

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      max: 250,
      default: "",
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    description: {
      type: String,
      max: 5000,
    },
    price: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: null,
    },
    stock: {
      type: Number,
      default: null,
    },
    quantity: {
      type: Number,
      default: null,
    },
    images: [String],
    color: {
      type: Array,
      default: [],
    },
    size: {
      type: Array,
      default: [],
    },
    video: {
      path: String,
      mimetype: String,
      size: Number,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    replies: {
      type: Array,
      default: [],
    },
    reviews: {
      type: Array,
      default: [],
    },
    type: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
