const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/auth");
const { sendJsonResponse, sendErrorResponse } = require("../utils/json");

const AuthController = {
  register: (req, res) => {
    User.count({ email: req.body.email }, function (err, count) {
      if (count > 0) {
        sendJsonResponse(res, 401, null);
        return;
      }

      User.create(
        {
          ...req.body,
          password: bcrypt.hashSync(req.body.password, 10),
        },
        (err, user) => {
          if (err) {
            sendErrorResponse(res, err.message);
            return;
          }

          sendJsonResponse(res, 201, user);
        }
      );
    });
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) {
        sendErrorResponse(res, err.message);
        return;
      }

      if (user === null) {
        sendJsonResponse(res, 401, null);
        return;
      }

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        sendJsonResponse(res, 401, null);
        return;
      }

      sendJsonResponse(res, 200, {
        token: jwt.sign({ email: user.email }, process.env.SECRET),
      });
    });
  },
};

module.exports = AuthController;