import connect from "../../../database/connect";
import Blogs from "@/models/lps";

export default async function handler(req, res) {
    if (req.method === "POST") {
        await connect.connect();
        const { id } = req.body;
        const blog = await Blogs.findOneAndUpdate(
            { _id: id },
            { $inc: { views_count: 1 } }
        );

        if (blog) {
            console.log("view updated");
            res.status(200).json({ message: "View updated" });
        } else {
            console.log("view not updated");
            res.status(409).json({ message: "Something went wrong" });
        }
    }
}
