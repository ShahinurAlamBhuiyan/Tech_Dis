'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, IconButton, Typography } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';
import Image from 'next/image';
import Individual_Comment from '@/components/lp/Individual_Comment';
import { useRouter } from 'next/router';
import swal from 'sweetalert';

const ViewPost = () => {
    const router = useRouter();
    const { post_id } = router.query;
    // const { id } = useParams();
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [blog, setBlog] = useState(null);
    const [comment_body, setCommentBody] = useState("");

    // getting loggedInUser from local Storage --> 
    useEffect(() => {
        const usr = localStorage.getItem("loggedInUser");
        if (usr) {
            setIsLoggedIn(true);
            setUser(JSON.parse(usr));
        }
        else {
            setIsLoggedIn(false);
        }
    }, []);

    // Getting clicked Blog --> 
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/lp/get_lp_one", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: post_id,
                }),
            });
            const data = await res.json();
            console.log(data);
            if (res.status === 200) {
                setBlog(data);
            }
        };
        fetchData();
    }, [post_id]);

    const addComment = async () => {
        // e.preventDefault();
        if (comment_body) {
            const res = await fetch("/api/lp/add_comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: post_id,
                    body: comment_body,
                    authorImageUrl: (user.imageUrl) ? user.imageUrl : '/images/default.jpg',
                    authorUsername: (user.username) ? user.username : 'guest-user',
                }),
            });
            const resp = await res.json();
        } else {
            swal({
                title: "comment can't empty!",
                icon: "error",
                button: "ok!",
            });
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/lp/update_views", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: post_id
                }),
            });
            const data = await res.json();
        };
        fetchData();
    }, [post_id]);

    return (
        <div>
            {blog ?
                <div className=' flex justify-center items-center flex-col'>
                    <Card className='w-[800px] m-3 border-none shadow-none' >
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: "red[500]" }} aria-label="" />
                            }
                            title={blog?.username}
                            subheader={blog?.date}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {blog?.title}
                            </Typography>
                        </CardContent>
                        <div className="ml-4 mt-3 flex space-x-2">
                            <small>Category: <b>{blog?.category}</b></small>
                        </div>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {blog?.post_body}
                            </Typography>
                        </CardContent>
                        <div className="ml-4 flex space-x-2">
                            <small>tags: </small> {blog?.tags?.map((tag, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className="inline-flex items-center rounded-sm border border-gray-500 bg-white px-1 py-0.5 text-xs font-normal text-gray-500 hover:bg-blue-600 indigo-500 hover:text-white focus:outline-none"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        <CardActions disableSpacing className="d-flex justify-between item-center">
                            <IconButton aria-label="add to favorites">
                                <CommentIcon />&nbsp; <span>{blog?.comment_count}</span>
                            </IconButton>
                            <IconButton aria-label="share">
                                <VisibilityIcon />&nbsp; <span>{blog?.views_count}</span>
                            </IconButton>
                        </CardActions>
                    </Card>



                    {/* COMMENT SECTIONS */}
                    <div className="mt-2 w-[800px] ">
                        <section aria-labelledby="notes-title">
                            <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                                <div className="divide-y divide-gray-200">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h2
                                            id="notes-title"
                                            className="text-lg font-medium text-gray-900"
                                        >
                                            Comments
                                        </h2>
                                    </div>
                                    <div className="px-4 py-6 sm:px-6">
                                        <ul role="list" className="space-y-5">
                                            {blog?.comment_list && blog?.comment_list.map((comment, index) =>
                                                <Individual_Comment key={comment._id} comment={comment} />
                                            )
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                    {isLoggedIn ? (<div className="flex space-x-3">
                                        <div className="flex-shrink-0">
                                            <Image
                                                height={100}
                                                width={100}
                                                className="h-10 w-10 rounded-full"
                                                src={user.imageUrl}
                                                alt=""
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <form action="#">
                                                <div>
                                                    <label htmlFor="comment" className="sr-only">
                                                        About
                                                    </label>
                                                    <textarea
                                                        id="comment"
                                                        name="comment"
                                                        rows={3}
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                        placeholder="Add a comment"
                                                        value={comment_body}
                                                        onChange={(e) => setCommentBody(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mt-3 flex items-center justify-between">
                                                    <a
                                                        href="#"
                                                        className="group inline-flex items-start space-x-2 text-sm text-gray-500 hover:text-gray-900"
                                                    >
                                                    </a>
                                                    <button
                                                        type="submit"
                                                        onClick={addComment}
                                                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                    >
                                                        Comment
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>) : (<Link href="/auth/login">Login to add comment</Link>)}

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                :
                <div className="flex w-full items-center justify-center mt-5 my-5">
                    <CircularProgress className=" w-full h-full" />
                </div>}
        </div>
    )
}

export default ViewPost