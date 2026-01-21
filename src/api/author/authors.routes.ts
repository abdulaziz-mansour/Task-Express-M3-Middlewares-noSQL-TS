import express from "express";
import { createAuthor, getAllAuthor } from "./authors.controller";

const authorRouter = express.Router();

authorRouter.post("/", createAuthor)
authorRouter.get("/", getAllAuthor)

export default authorRouter;