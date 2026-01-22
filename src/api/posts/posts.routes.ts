import express from "express";
import { createPost, deletePost, getAllPosts, updatePost } from "./posts.controller";
import { upload } from "../../middlewares/multer.middleware";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.post("/", upload.single("image"), createPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;