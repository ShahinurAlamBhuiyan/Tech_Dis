'use client';
import { useEffect, useState } from "react";
import Link from "next/link";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [post_body, setPost_body] = useState("");
    const [tag, setTag] = useState("");
    const [category, setCategory] = useState("");


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
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

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // getting current date
    const currentDateTime = (new Date()).toLocaleString()
    const currentDate = currentDateTime.split(",").slice(0, 1).join("");

    const handlePost = async () => {
        const res = await fetch("/api/lp/add_lp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: getRandomInt(1, 100000000),
                username: user.username,
                title: title,
                post_body: post_body,
                date: currentDate,
                tags: tag.split(","),
                category: category,
                views_count: 0,
                comment_count: 0,
                comment_lists: []
            }),

        });


        const resp = await res.json();
        console.log(resp);
        if (resp.status === 200) {
            alert(resp.message);
        }
        else {
            alert(resp.message);
        }
    };

    return (
        <>
            <main className="lg:col-span-12 xl:col-span-10  p-5">
                <div className="mt-0">
                    <form action="#" method="POST" className="mx-auto mt-0 max-w-xl sm:mt-10">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        onChange={(e) => setTitle(e.target.value)}
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={title}
                                        placeholder="your blog title"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        onChange={(e) => setCategory(e.target.value)}
                                        type="text"
                                        name="category"
                                        id="category"
                                        value={category}
                                        placeholder="your blog category"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="details" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Details
                                </label>
                                <div className="mt-2.5">
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={4}
                                        onChange={(e) => setPost_body(e.target.value)}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                        placeholder="your blog details"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="email"
                                    className="block text-lg font-medium text-gray-700"
                                >
                                    Tags
                                </label>
                                <p
                                    className="mb-2 text-sm text-gray-500"
                                    id="tag-description"
                                >
                                    Add up to 5 tags to describe what your blog is
                                    about. Tags should be separated by comma.
                                </p>
                                <div className="mt-2.5">
                                    <input
                                        onChange={(e) => setTag(e.target.value)}
                                        type="text"
                                        name="tag"
                                        id="tag"
                                        value={tag}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="e.g. react, javascript, typescript, python"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <Link href="/lp">
                                <button
                                    type="button"
                                    onClick={handlePost}
                                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Post
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}