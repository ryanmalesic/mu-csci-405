const moment = require("moment");
const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  author: {
    avatar: { type: String, required: true },
    name: { type: String, required: true },
    handle: { type: String, required: true },
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdOn: { type: Date, "default": Date.now },
  lastEditedOn: { type: Date },
  tags: { type: [String], required: true },
});

const Blog = mongoose.model("Blog", blogSchema);

const seed = () => {
  new Blog({
    author: {
      avatar:
        "https://icon-library.net/images/anonymous-avatar-icon/anonymous-avatar-icon-13.jpg",
      name: "Ryan Malesic",
      handle: "@ryanmalesic",
    },
    title: "Lorem Ipsum 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id volutpat lacus laoreet non.",
    createdOn: moment().subtract(3, "days").toDate(),
    lastEditedOn: moment().subtract(1, "days").toDate(),
    tags: ["eleifend", "quam", "adipiscing"],
  }).save();

  new Blog({
    author: {
      avatar:
        "https://icon-library.net/images/anonymous-avatar-icon/anonymous-avatar-icon-13.jpg",
      name: "Ryan Malesic",
      handle: "@ryanmalesic",
    },
    title: "Lorem Ipsum 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque diam volutpat commodo sed egestas egestas fringilla.",
    createdOn: moment().subtract(2, "days").toDate(),
    lastEditedOn: moment().subtract(1, "days").toDate(),
    tags: ["ullamcorper", "dignissim", "cras"],
  }).save();

  new Blog({
    author: {
      avatar:
        "https://icon-library.net/images/anonymous-avatar-icon/anonymous-avatar-icon-13.jpg",
      name: "Ryan Malesic",
      handle: "@ryanmalesic",
    },
    title: "Lorem Ipsum 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet commodo nulla facilisi nullam vehicula.",
    createdOn: moment().subtract(1, "days").toDate(),
    lastEditedOn: moment().toDate(),
    tags: ["nullam", "eget", "felis"],
  }).save();
};

Blog.find((err, blogs) => {
  if (blogs.length) return;
  seed();
});

module.exports = Blog;
