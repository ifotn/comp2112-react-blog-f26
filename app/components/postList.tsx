'use client';

import { Post } from "@/app/types/post";
import { useSessionCounter } from "@/app/context/globalContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

// show 5 blog posts per page
const PAGE_SIZE: number = 5;

export default function PostList({posts}: {posts: Post[]}) {
    // check global context for username
    const {username} = useSessionCounter();

    const router = useRouter();

    // set default page to 1
    const [currentPage, setCurrentPage] = useState<number>(1);

    // calc # of total pages with 5 posts per page. e.g. 16 posts => 4 pages (3 full, 1 partial)
    const totalPages: number = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));

    // keep page if posts removed
    const page: number = Math.min(currentPage,  totalPages);
    const startIndex: number = (page - 1) * PAGE_SIZE;

    // get only the posts for current page
    const visiblePosts: Post[] = posts.slice(startIndex, startIndex + PAGE_SIZE);

    // handleDelete for Lab 5 goes here
    const handleDelete = async (id: string) => {
        const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN!;

        if (!confirm('Are you sure you want to delete this Post?')) return;

        const res: Response = await fetch(`${apiDomain}/posts/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (res.ok) router.refresh();
    }

    //console.log(posts);
    return (
        <>
            <h3>{posts.length} Posts</h3>
            <ul>
                {visiblePosts.map((post) => (
                    <li key={post._id} className="card">
                        <h3>{post.title}</h3>
                        {username == post.author &&
                            <>
                                <Link href={`/blog/${post._id}/edit`} className="button">Edit</Link>
                                <button onClick={() => handleDelete(post._id)} className="deleteButton">Delete</button>
                            </>
                        }
                    </li>
                ))}
            </ul>
            {posts.length > PAGE_SIZE && (
                <nav className="pagination">
                    <button onClick={() => setCurrentPage((page - 1))}
                       disabled={page == 1}>
                        Previous
                    </button>
                    <span>
                        {' '}Page {page} of {totalPages}{' '}
                    </span>
                    <button onClick={() => setCurrentPage((page + 1))}
                       disabled={page == totalPages}>
                        Next
                    </button>
                </nav>
            )}
        </>
    )

}