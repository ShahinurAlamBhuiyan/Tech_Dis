import connect from "@/database/connect";
import Blogs from "@/models/lps";

export default async function handler(req, res) {
    if (req.method === "POST") {
        await connect.connect();

        const reqBody = await req.body;
        const { id, body, authorUsername, authorImageUrl } = reqBody;
        const blog = await Blogs.findById(id);
        if (!blog) {
            return res.json({ message: 'blog not found' }, { status: 404 });
        }

        const newComment = {
            authorUsername: authorUsername,
            authorImageUrl: authorImageUrl,
            body: body,
        };


        blog.comment_list.push(newComment);
        blog.comment_count++;
        await blog.save();
        return res.json({ message: 'Comment added successfully' });

    }
}