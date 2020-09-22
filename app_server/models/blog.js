const moment = require("moment");
const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  author: {
    avatar: String,
    name: String,
    handle: String,
  },
  title: String,
  content: String,
  createdOn: Date,
  lastEditedOn: Date,
  tags: [String],
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
    createdOn: moment().subtract(1, "days").toDate(),
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
    createdOn: moment().subtract(1, "days").toDate(),
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
