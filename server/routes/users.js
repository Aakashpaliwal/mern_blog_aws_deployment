import express from "express";
import { signIn, signUp } from "../controller/users.js";
// const { createPost } = require("../controller/post.js");

const router = express.Router();

router.post("/login", signIn);
router.post("/register", signUp);

export default router;
// module.exports = router;
