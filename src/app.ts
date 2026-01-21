import express from "express";
import connectDB from "./database";
import authorRouter from "./api/author/authors.routes";
import postRouter from "./api/posts/posts.routes";
import tagRouter from "./api/tag/tag.routes";


const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/posts", postRouter);
app.use("/authors", authorRouter);
app.use("/tags", tagRouter);


connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});