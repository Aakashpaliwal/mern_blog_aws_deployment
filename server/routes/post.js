import express from "express";
import {
  createPost,
  deletePost,
  getPostByUser,
  getPosts,
  updatePost,
} from "../controller/post.js";
import auth from "../middleware/auth.js";
// const { createPost } = require("../controller/post.js");

const router = express.Router();

router.post("/addPost", auth, createPost);
router.get("/allPosts", getPosts);
router.get("/allPosts/:id", getPostByUser);
router.delete("/deletePost/:id", auth, deletePost);
router.patch("/updatePost/:id", auth, updatePost);

export default router;
// module.exports = router;
