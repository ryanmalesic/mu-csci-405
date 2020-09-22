const express = require("express");

const BlogController = require("../controllers/blog");
const HomeController = require("../controllers/home");

const router = express.Router();

router.get("/", HomeController.showHome);
router.get("/blogs", BlogController.showList);
router.get("/blogs/add", BlogController.showAdd);
router.get("/blogs/*/edit", BlogController.showEdit);
router.get("/blogs/*/delete", BlogController.showDelete);

module.exports = router;
