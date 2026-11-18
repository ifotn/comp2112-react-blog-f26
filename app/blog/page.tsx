import {Post} from "@/app/types/post";
import Link from "next/link";
import PageTitle from "@/app/components/pageTitle";
import NewPostLink from "@/app/components/newPostLink";
import PostList from "@/app/components/postList";

export default async function Blog() {
    // get api domain from .env ; ! at the end is just a null check
    const apiDomain: string = process.env.NEXT_PUBLIC_API_DOMAIN!;

    // fetch blog data from external api
    const data: Response = await fetch(`${apiDomain}/posts`);

    // convert api data to an array of Post objects
    const posts: Post[] = await data.json();

    return (
        <main>
            <PageTitle title="Blog" />
            <h1>Blog</h1>
            <NewPostLink />
            <PostList posts={posts} />
            {/*<ul>*/}
            {/*    {posts.map((post) => (*/}
            {/*        <li key={post._id} className="card">*/}
            {/*            <Link href={`/blog/${post._id}`}>*/}
            {/*                <h2>{post.title}</h2>*/}
            {/*            </Link>*/}
            {/*            <Link href={`/blog/${post._id}/edit`} className="button">Edit</Link>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </main>
    );
}