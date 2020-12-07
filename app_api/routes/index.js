const express = require("express");

const AuthController = require("../controllers/auth");
const BlogController = require("../controllers/blog");
const MessageController = require("../controllers/message");

const router = express.Router();

router.get("/blogs", BlogController.list);
router.post("/blogs", BlogController.create);
router.get("/blogs/:id", BlogController.read);
router.put("/blogs/:id", BlogController.update);
router.delete("/blogs/:id", BlogController.delete);

router.post("/blogs/:id/comments", BlogController.createComment);
router.put("/blogs/:id/cheer", BlogController.cheer);

router.get("/messages", MessageController.list);
router.post("/messages", MessageController.create);

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", AuthController.me);

module.exports = router;
