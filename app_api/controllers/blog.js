const moment = require("moment");

const Blog = require("../../app_api/models/blog");
const { sendJsonResponse, sendErrorResponse } = require("../utils/json");

const BlogController = {
  list: (_req, res) => {
    Blog.find().sort({ lastEditedOn: "descending", createdOn: "descending" }).exec((err, blogs) => {
      if (err) {
        sendErrorResponse(res, err.message);
        return;
      }

      blogs.forEach((blog) => {
        blog.createdOn = moment(blog.createdOn).format("LLL");
        blog.lastEditedOn = moment(blog.lastEditedOn).format("LLL");
      })

      sendJsonResponse(res, 200, blogs);
    });
  },
  create: (req, res) => {
    Blog.create(
      {
        ...req.body,
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
    Blog.findByIdAndUpdate(req.params.id, { ...req.body, lastEditedOn: new Date() }, (err, blog) => {
      if (err) {
        sendErrorResponse(res, err.message);
        return;
      }

      sendJsonResponse(res, 200, blog);
    });
  },
  delete: (req, res) => {
    Blog.findByIdAndDelete(req.params.id).exec((err, _blog) => {
      if (err) {
        sendErrorResponse(res, err.message);
        return;
      }

      sendJsonResponse(res, 204, null);
    });
  },
};

module.exports = BlogController;
