import { Request, Response } from "express";
import Tag from "../../models/Tag";
import Post from "../../models/Post";

export const createTag = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        const tag = await Tag.create({ name });

        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getAllTags = async (req: Request, res: Response) => {
    try {
        const tags = await Tag.find().populate("posts");

        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const addTagToPost = async (req: Request, res: Response) => {
    try {
        const { postId, tagId } = req.params;

        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({ error: "Post not found" });
        }

        const tag = await Tag.findById(tagId);
        if (!tag) {
            res.status(404).json({ error: "Tag not found" });
        }

        await Post.findByIdAndUpdate(
            postId,
            { $push: { tags: tagId } },
            { new: true }
        );

        await Tag.findByIdAndUpdate(
            tagId,
            { $push: { posts: postId } },
            { new: true }
        );

        res.status(200).json({ message: "Tag added to post successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};