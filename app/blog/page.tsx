import {Post} from "@/app/types/post";

export default async function Blog() {
    // fetch blog data from external api
    const data: Response = await fetch('https://api.vercel.app/blog');

    // convert api data to an array of Post objects
    const posts: Post[] = await data.json();

    return (
        <main>
            <h1>Blog</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {post.title}
                    </li>
                ))}
            </ul>
        </main>
    );
}