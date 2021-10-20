const express = require("express");

const router = express.Router();

const {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const protect = require("../config/authMiddleware");

router.route("/").get(protect, getAllPosts).post(protect, createPost);
router
  .route("/:id")
  .get(protect, getOnePost)
  .patch(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
