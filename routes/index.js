var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (_req, res) {
  res.render("index", { name: "Ryan Malesic" });
});

/* GET bio page. */
router.get("/bio", function (_req, res) {
  res.render("bio", { name: "Ryan Malesic" });
});

module.exports = router;
