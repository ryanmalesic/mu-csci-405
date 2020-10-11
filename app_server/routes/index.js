const express = require("express");

const BlogController = require("../controllers/blog");
const HomeController = require("../controllers/home");

const router = express.Router();

router.get("/", HomeController.showHome);
router.get("/blogs", BlogController.showList);
router.get("/blogs/add", BlogController.showAdd);
router.post("/blogs/add", BlogController.add);
router.get("/blogs/:id", BlogController.showGet);
router.get("/blogs/:id/edit", BlogController.showEdit);
router.post("/blogs/:id/edit", BlogController.edit);
router.get("/blogs/:id/delete", BlogController.showDelete);
router.post("/blogs/:id/delete", BlogController.delete);

module.exports = router;
