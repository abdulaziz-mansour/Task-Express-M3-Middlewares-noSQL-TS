import Post from "../../models/Post";
import { Request, Response } from "express";
import Author from "../../models/Author";

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().populate("author");

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, body, authorID } = req.body;
        if (req.file) {
            req.body.image = req.file.path;
        }
        console.log(req.file)

        const author = await Author.findById(authorID);
        if (!author) {
            res.status(404).json({ error: "Author not found" });
            return
        }
        console.log(author)

        const post = await Post.create({
            title,
            body,
            author: authorID,
            image: req.body.image
        });

        console.log(post)


        await Author.findByIdAndUpdate(
            authorID,
            { $push: { posts: post._id } },
            { new: true }
        );

        res.status(201).json({ post, author });
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const foundPost = await Post.findById(id);
        if (!foundPost) {
            res.status(404).json({ message: "Post not found" });
        } else {
            await foundPost.updateOne(req.body);
            res.json({ message: "Post updated successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating post" });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
};