'use client';

import Link from "next/link";
import { useSessionCounter } from "@/app/context/globalContext";

export default function NewPostLink() {
    const { username } = useSessionCounter();

    return (
        <>
            {username &&
                <Link href="/blog/create-post" className="newLink">Create New Blog Post</Link>
            }
        </>
   )
}