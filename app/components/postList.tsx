'use client';

import { Post } from "@/app/types/post";
import { useSessionCounter } from "@/app/context/globalContext";
import {BtnLink} from "react-simple-wysiwyg";
import Link from "next/link";

export default function PostList({posts}: {posts: Post[]}) {
    // check global context for username
    const { username } = useSessionCounter();

    //console.log(posts);
    return (
        <ul>
            {posts.map((post) => (
                <li key={post._id} className="card">
                    <h3>{post.title}</h3>
                    {username == post.author &&
                        <Link href={`/blog/${post._id}/edit`} className="button">Edit</Link>
                    }
                </li>
            ))}
        </ul>
    )

}