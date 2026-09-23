import {Post} from "@/app/types/post";

export default async function BlogDetail({ params }: { params: { id: string }}) {
    // use id from url params
    const { id } = await params;
    // console.log('id: ' + id);

    // fetch selected blog post from api
    const url: string = 'https://api.vercel.app/blog/' + id;
    // console.log('url: ' + url);
    const res: Response = await fetch(url, {
        cache: 'no-store'
    });

    // console.log(res);

    // convert response to a Post type
    const post: Post = await res.json();

    // check for Not Found result / invalid id
    if (!res.ok) {
        return (
            <main>
                <h1>Post Not Found</h1>
            </main>
        );
    }

    // console.log(post);
    return (
        <main>
            <h1>{post.title}</h1>
            <h2>{post.author} on {post.date}</h2>
            <article>{post.content}</article>
        </main>
    );
}