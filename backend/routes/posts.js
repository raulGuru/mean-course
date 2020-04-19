const express = require("express");

const PostController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");

const multerStorage = require("../middleware/multer");

const router = express.Router();

router.post("", checkAuth, multerStorage, PostController.createPost);

router.put("/:id", checkAuth, multerStorage, PostController.udpatePost);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
