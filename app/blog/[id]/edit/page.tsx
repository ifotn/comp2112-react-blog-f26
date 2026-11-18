import EditPostForm from "@/app/components/editPostForm";
import { Post } from "@/app/types/post";

// to read id from url param
type Props = {
    params: Promise<{ id: string }>
};

export default async function EditPostPage({ params }: Props) {
    // get id from url param
    const { id } = await params;

    // fetch selected post from api
    const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN!;

    const res: Response = await fetch(`${apiDomain}/posts/${id}`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return (
            <main>
                <h1>Post Not Found</h1>
            </main>
        )
    }

    const post: Post = await res.json();

    // show populated edit form, passing selected post & id
    return <EditPostForm id={id} post={post} />
}