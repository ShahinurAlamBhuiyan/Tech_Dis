// create apis for learning platform

// merge
import connect from "@/database/connect";
import Blogs from "@/models/lps";

export default async function handler(req, res) {
    if (req.method === "POST") {
        await connect.connect();
        const reqBody = await req.body;
        const newBlog = new Blogs(reqBody);
        await newBlog.save();
        const blogs = await Blogs.find();
        if (blogs) {
            return res.json({ message: "Blog added successfully" });
        } else {
            return res.json({ message: "Something went wrong" });
        }
    }
    if (req.method === "GET") {
        await connect.connect();
        const blogs = await Blogs.find();
        if (blogs) {
            return res.json(blogs);
        } else {
            return res.json({ message: "Something went wrong" });
        }
    }
}
