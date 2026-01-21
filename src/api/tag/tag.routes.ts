import express from "express";
import { addTagToPost, createTag, getAllTags } from "./tag.controller";

const tagRouter = express.Router();

tagRouter.post("/", createTag);
tagRouter.get("/", getAllTags);
tagRouter.post("/:postId/:tagId", addTagToPost);

export default tagRouter;