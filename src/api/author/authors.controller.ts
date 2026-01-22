import { NextFunction, Request, Response } from "express";
import Author from "../../models/Author";

const createAuthor = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newAuthor = await Author.create({
            name: name,
        });
        res.status(201).json({
            message: "Author has been created successfully",
            Author: newAuthor,
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const Authors = await Author.find().populate("posts");
        res.status(200).json({ message: "Found all authors", data: Authors });
    } catch (error) {
        next(error)
    }
};

export { createAuthor, getAllAuthor };