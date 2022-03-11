import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const createPost = async (req, res) => {
  //   console.log("req.body", req.body);
  const newPost = new PostMessage({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  //   console.log("newPost", newPost);
  try {
    await newPost.save();
    res.status(200).json({
      message: "Post added successfully",
    });
  } catch (error) {
    console.log("error==", error);
    res.status(500).json({
      message: "Post not added",
      error: error,
    });
  }
};

export const getPostByUser = async (req, res) => {
  console.log("req==", req.params);
  try {
    const posts = await PostMessage.find({ creator: req.params.id });
    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log("error==", error);
    res.status(500).json({
      message: "Posts not fetched",
      error: error,
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    console.log("getposterror", error);
    res.status(500).json({
      message: "uanble to fetch posts",
      error: error,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post with this Id");
  try {
    await PostMessage.findByIdAndRemove(id);
    res.json({ message: "Post Delete Successfully!!!" });
  } catch (error) {
    console.log("catchdeleteerror", error);
    res.status(500).json({
      message: "Unable to delete post",
      error: error,
    });
  }
};
