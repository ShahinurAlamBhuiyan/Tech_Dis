import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    post_body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: String,
        },
    ],
    category: {
        type: String,
        required: true,
    },
    views_count: {
        type: Number,
        default: 0,
    },
    comment_count: {
        type: Number,
        default: 0,
    },
    comment_list: [
        {
            body: {
                type: String,
            },
            authorUsername: {
                type: String,
            },
            authorImageUrl: {
                type: String,
            },
        }
    ],
});

const Blogs =
    mongoose.models.blogs || mongoose.model("blogs", blogsSchema);

export default Blogs;