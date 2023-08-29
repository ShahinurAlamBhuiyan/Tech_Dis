import { Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'

import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';

const SingleBlog = ({ blog }) => {
    return (
        <Card className='w-full m-3' key={blog._id}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "red[500]" }} aria-label="" />
                }
                title={blog?.username}
                subheader={blog?.date}
            />
            <CardContent>
                <Typography gutterBottom variant="h6">
                    {blog?.title}
                </Typography>
            </CardContent>
            <div className="ml-4 flex">
                <small>Category: <b>{blog?.category}</b></small>
            </div>
            <CardContent className=' h-[150px]'>
                <Typography variant="body2" color="text.secondary">
                    {(blog?.post_body).slice(0, 200)}...
                    <Link href={"/lp/view/" + blog._id}>
                        <button className='underline font-bold text-blue-700'> see-more</button>
                    </Link>
                </Typography>
            </CardContent>
            <CardContent className="ml-4 flex space-x-2">
                <small>tags: </small> {blog?.tags?.map((tag, index) => (
                    <button
                        key={index}
                        type="button"
                        className="inline-flex items-center rounded-sm border border-gray-500 bg-white px-1 py-0.5 text-xs font-normal text-gray-500 hover:bg-blue-600 indigo-500 hover:text-white focus:outline-none"
                    >
                        {tag}
                    </button>
                ))}
            </CardContent>

            <CardActions disableSpacing className="d-flex justify-between item-center">
                <IconButton aria-label="add to favorites">
                    <CommentIcon />&nbsp; <span>{blog?.comment_count}</span>
                </IconButton>
                <IconButton aria-label="share">
                    <VisibilityIcon />&nbsp; <span>{blog?.views_count}</span>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default SingleBlog