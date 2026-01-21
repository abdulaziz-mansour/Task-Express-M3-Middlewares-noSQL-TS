import express from "express";
import { createPost, deletePost, getAllPosts, updatePost } from "./posts.controller";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.post("/", createPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;