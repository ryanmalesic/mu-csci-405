const moment = require("moment");

const Blog = require("../models/blog");

const BlogController = {
  showList: (_req, res) => {
    Blog.find((_err, blogs) => {
      const context = {
        blogs: blogs.map((blog) => ({
          id: blog.id,
          author: {
            avatar: blog.author.avatar,
            name: blog.author.name,
            handle: blog.author.handle,
          },
          title: blog.title,
          content: blog.content,
          createdOn: moment(blog.createdOn).format("LLL"),
          lastEditedOn: moment(blog.lastEditedOn).format("LLL"),
          tags: blog.tags,
        })),
      };

      res.render("blogs/list", context);
    });
  },
  showAdd: (_req, res) => {
    res.render("blogs/add");
  },
  showEdit: (_req, res) => {
    res.render("blogs/edit");
  },
  showDelete: (_req, res) => {
    res.render("blogs/delete");
  },
};

module.exports = BlogController;
