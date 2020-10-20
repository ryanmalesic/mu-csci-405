const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

require("./app_api/db");

const apiRouter = require("./app_api/routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", apiRouter);

app.use("/css", express.static(__dirname + "/app_client/css"));
app.use("/css/bulma", express.static(__dirname + "/node_modules/bulma/css/"));
app.use("/js", express.static(__dirname + "/app_client/js"));
app.use("/partials", express.static(__dirname + "/app_client/partials"));
app.use("/templates", express.static(__dirname + "/app_client/templates"));

app.all("/*", function (req, res, next) {
  res.sendFile("index.html", { root: __dirname + "/app_client" });
});

module.exports = app;
