const express = require("express");

const AuthController = require("../controllers/auth");
const BlogController = require("../controllers/blog");

const router = express.Router();

router.get("/blogs", BlogController.list);
router.post("/blogs", BlogController.create);
router.get("/blogs/:id", BlogController.read);
router.put("/blogs/:id", BlogController.update);
router.delete("/blogs/:id", BlogController.delete);

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;
