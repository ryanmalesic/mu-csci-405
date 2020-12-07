const moment = require("moment");

const Message = require("../../app_api/models/message");
const { isAuthenticated } = require("../utils/auth");
const { sendJsonResponse, sendErrorResponse } = require("../utils/json");

const MessageController = {
  list: (_req, res) => {
    Message.find()
      .sort({ createdOn: "ascending" })
      .exec((err, messages) => {
        if (err) {
          sendErrorResponse(res, err.message);
          return;
        }

        sendJsonResponse(res, 200, messages);
      });
  },
  create: (req, res) => {
    const user = isAuthenticated(req.header("Authorization").substring(7));

    if (!user) {
      sendJsonResponse(res, 401, null);
      return;
    }

    Message.create(
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
};

module.exports = MessageController;
