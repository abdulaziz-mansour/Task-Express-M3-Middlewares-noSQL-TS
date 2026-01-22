import express, { Request, Response, NextFunction } from "express";
import connectDB from "./database";
import authorRouter from "./api/author/authors.routes";
import postRouter from "./api/posts/posts.routes";
import tagRouter from "./api/tag/tag.routes";
import morgan from "morgan";
import { notFound } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import path from "path";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(morgan("dev"));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("REQUEST IS HEREEE!!!!!!")
    next()
})

app.use("/posts", postRouter);
app.use("/authors", authorRouter);
app.use("/tags", tagRouter);
app.use("/media", express.static(path.join(__dirname, "../media")));

app.use(notFound);
app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});