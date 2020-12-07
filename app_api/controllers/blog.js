const moment = require("moment");

const Blog = require("../../app_api/models/blog");
const { isAuthenticated } = require("../utils/auth");
const { sendJsonResponse, sendErrorResponse } = require("../utils/json");

const BlogController = {
  list: (_req, res) => {
    Blog.find()
      .sort({ lastEditedOn: "descending", createdOn: "descending" })
      .exec((err, blogs) => {
        if (err) {
          sendErrorResponse(res, err.message);
          return;
        }

        blogs.forEach((blog) => {
          blog.createdOn = moment(blog.createdOn).format("LLL");
          blog.lastEditedOn = moment(blog.lastEditedOn).format("LLL");
        });

        sendJsonResponse(res, 200, blogs);
      });
  },
  create: (req, res) => {
    const user = isAuthenticated(req.header("Authorization").substring(7));

    if (!user) {
      sendJsonResponse(res, 401, null);
      return;
    }

    Blog.create(
      {
        ...req.body,
        author: {
          email: user.email,
          name: user.name,
        },
        lastEditedOn: new Date(),
      },
      (err, blog) => {
        if (err) {
          sendErrorResponse(res, err.message);
          return;
        }

        sendJsonResponse(res, 201, blog);
      }
    );
  },
  read: (req, res) => {
    Blog.findById(req.params.id).exec((err, blog) => {
      if (err) {
        sendErrorResponse(res, err.message);
        return;
      }

      sendJsonResponse(res, 200, blog);
    });
  },
  update: (req, res) => {
    const user = isAuthenticated(req.header("Authorization").substring(7));

    if (!user) {
      sendJsonResponse(res, 401, null);
      return;
    }

    Blog.findOneAndUpdate(
      { _id: req.params.id, "author.email": user.email },
      { ...req.body, lastEditedOn: new Date() },
      (err, blog) => {
        if (err) {
          sendErrorResponse(res, err.message);
          return;
        }

        sendJsonResponse(res, 200, blog);
      }
    );
  },
  delete: (req, res) => {
    const user = isAuthenticated(req.header("Authorization").substring(7));

    if (!user) {
      sendJsonResponse(res, 401, null);
      return;
    }

    Blog.findOneAndDelete({
      _id: req.params.id,
      "author.email": user.email,
    }).exec((err, _blog) => {
      if (err) {
        sendErrorResponse(res, err.message);
        return;
      }

      sendJsonResponse(res, 204, null);
    });
  },
  createComment: (req, res) => {
    const user = isAuthenticated(req.header("Authorization").substring(7));

    if (!user) {
      sendJsonResponse(res, 401, null);
      return;
    }

    Blog.findById(req.params.id).exec((err, blog) => {
      if (err) {
        sendErrorResponse(res, err.message);
        return;
      }

      blog.comments.push({
        ...req.body,
        author: {
          email: user.email,
          name: user.name,
        },
      });

      blog.save((err) => {
        if (err) {
          sendErrorResponse(res, err.message);
          return;
        }

        sendJsonResponse(res, 201, blog);
      });
    });
  },
  cheer: (req, res) => {
    const user = isAuthenticated(req.header("Authorization").substring(7));

    if (!user) {
      sendJsonResponse(res, 401, null);
      return;
    }

    Blog.findById(req.params.id).exec((err, blog) => {
      if (err) {
        sendErrorResponse(res, err.message);
        return;
      }

      blog.cheers += 1;

      blog.save((err) => {
        if (err) {
          sendErrorResponse(res, err.message);
          return;
        }

        sendJsonResponse(res, 201, blog);
      });
    });
  },
};

module.exports = BlogController;
